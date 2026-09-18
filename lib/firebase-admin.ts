import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore, QueryDocumentSnapshot } from "firebase-admin/firestore";

interface StoredResponse {
  responseId: string;
  angerChoice?: string;
  angerLevel?: number;
  smiling?: string;
  deserved?: string;
  keepSayingSorry?: string;
  finalChoice?: string;
  sorryCount: number;
  completedAt: string;
  timestamp: number;
}

// In-memory fallback cache for development or when Firebase credentials are not yet configured
const inMemoryFallbackResponses: Map<string, StoredResponse> = new Map();

function formatPrivateKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  return key.replace(/\\n/g, "\n");
}

let firestoreInstance: Firestore | null = null;

export function getFirestoreDb(): Firestore | null {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  try {
    const apps = getApps();
    if (apps.length > 0) {
      firestoreInstance = getFirestore();
      return firestoreInstance;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    let app: App | null = null;

    if (serviceAccountJson) {
      const parsed = JSON.parse(serviceAccountJson);
      app = initializeApp({
        credential: cert(parsed),
      });
    } else if (projectId && clientEmail && privateKey) {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }

    if (app) {
      firestoreInstance = getFirestore(app);
      return firestoreInstance;
    }

    console.warn(
      "[Firebase Admin] Credentials not found in environment variables. Operating in safe fallback mode."
    );
    return null;
  } catch (error) {
    console.error("[Firebase Admin] Initialization error:", error);
    return null;
  }
}

/**
 * Save a completed apology response to Firestore
 */
export async function saveApologyResponse(data: Omit<StoredResponse, "timestamp">): Promise<{
  success: boolean;
  responseId: string;
  savedTo: "firestore" | "fallback";
}> {
  const timestamp = Date.now();
  const fullData: StoredResponse = {
    ...data,
    timestamp,
  };

  const db = getFirestoreDb();

  if (db) {
    try {
      const collectionRef = db.collection("responses");
      const docRef = collectionRef.doc(data.responseId);
      await docRef.set(fullData);
      return { success: true, responseId: data.responseId, savedTo: "firestore" };
    } catch (err) {
      console.error("[Firebase Admin] Failed to save to Firestore, falling back:", err);
    }
  }

  // Fallback in memory
  inMemoryFallbackResponses.set(data.responseId, fullData);
  return { success: true, responseId: data.responseId, savedTo: "fallback" };
}

/**
 * Fetch all responses ordered by newest first
 */
export async function getAllResponses(): Promise<StoredResponse[]> {
  const db = getFirestoreDb();

  if (db) {
    try {
      const snapshot = await db.collection("responses").orderBy("timestamp", "desc").get();
      const results: StoredResponse[] = [];
      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        const d = doc.data() as StoredResponse;
        results.push(d);
      });
      return results;
    } catch (err) {
      console.error("[Firebase Admin] Error fetching from Firestore, returning fallback:", err);
    }
  }

  // Return fallback in-memory responses
  const fallbackList = Array.from(inMemoryFallbackResponses.values()).sort(
    (a, b) => b.timestamp - a.timestamp
  );
  return fallbackList;
}

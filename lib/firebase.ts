import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  Firestore,
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

let db: Firestore | null = null;

export function getDb(): Firestore | null {
  if (db) return db;
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    return db;
  } catch (err) {
    console.warn("[Firebase Client] Initialized in fallback mode:", err);
    return null;
  }
}

export interface StoredResponse {
  responseId: string;
  angerChoice?: string;
  angerLevel?: number;
  smiling?: string;
  deserved?: string;
  customDeservedNote?: string;
  keepSayingSorry?: string;
  finalChoice?: string;
  sorryCount: number;
  pviMessage?: string;
  completedAt: string;
  timestamp: number;
}

// Memory fallback store
const memoryStore: Map<string, StoredResponse> = new Map();

/**
 * Save to Firestore collection "responses"
 */
export async function saveResponseToFirestore(
  data: Omit<StoredResponse, "timestamp">
): Promise<{ success: boolean; responseId: string; source: "firestore" | "fallback" }> {
  const timestamp = Date.now();
  const docData: StoredResponse = {
    ...data,
    timestamp,
  };

  const firestore = getDb();
  if (firestore) {
    try {
      const docRef = doc(firestore, "responses", data.responseId);
      await setDoc(docRef, docData);
      return { success: true, responseId: data.responseId, source: "firestore" };
    } catch (err) {
      console.warn("[Firebase] Could not save directly to Firestore, saving to fallback:", err);
    }
  }

  memoryStore.set(data.responseId, docData);
  return { success: true, responseId: data.responseId, source: "fallback" };
}

/**
 * Retrieve all responses from Firestore "responses"
 */
export async function getResponsesFromFirestore(): Promise<StoredResponse[]> {
  const firestore = getDb();
  if (firestore) {
    try {
      const q = query(collection(firestore, "responses"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const list: StoredResponse[] = [];
      snapshot.forEach((d) => {
        list.push(d.data() as StoredResponse);
      });
      if (list.length > 0) return list;
    } catch (err) {
      console.warn("[Firebase] Could not read from Firestore, reading from fallback:", err);
    }
  }

  return Array.from(memoryStore.values()).sort((a, b) => b.timestamp - a.timestamp);
}

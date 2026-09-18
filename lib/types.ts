export interface ApologyResponse {
  responseId?: string;
  angerChoice?: string;
  angerLevel?: number;
  smiling?: string;
  deserved?: string;
  keepSayingSorry?: string;
  finalChoice?: string;
  sorryCount: number;
  completedAt: string;
  timestamp?: number;
}

export interface ExperienceState {
  currentScene: number;
  angerChoice: string;
  angerLevel: number;
  smiling: string;
  deserved: string;
  keepSayingSorry: string;
  sorryCount: number;
  milestoneUnlocked: number | null;
  finalChoice: string;
  submissionStatus: "idle" | "submitting" | "success" | "error";
  responseId: string | null;
  errorMessage: string | null;
}

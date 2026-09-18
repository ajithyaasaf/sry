export interface VoiceConfig {
  enabled: boolean;
  audioPath: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
}

export const voiceConfig: VoiceConfig = {
  // Enabled can be set to true or automatically checked in client
  enabled: true,
  audioPath: "/audio/apology.mp3",
  title: "Okay... no more typing.",
  subtitle: "Just a short voice note from Aji.",
  buttonLabel: "Listen to Aji",
};

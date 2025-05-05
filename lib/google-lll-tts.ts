export type LanguageCode = "en-US" | string;
export type VoiceName = "en-US-Chirp3-HD-Orus" | string;

export const generateSpeech = async (
  text: string,
  languageCode: LanguageCode = "en-US",
  voiceName: VoiceName = "en-US-Chirp3-HD-Orus"
) => {
  const response = await fetch("/api/text-to-speech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, languageCode, voiceName }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate speech");
  }

  const dataBase64 = await response.json();
  return dataBase64;
};

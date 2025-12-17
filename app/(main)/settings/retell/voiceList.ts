import Retell from "retell-sdk";

const client = new Retell({
  apiKey: process.env.NEXT_PUBLIC_RETELL_API_KEY!,
});

const voiceResponses = await client.voice.list();

// filter provider elevenlabs
const elevenLabsVoices = voiceResponses.filter(
  (voice) => voice.provider === "elevenlabs"
);
export const voiceList = elevenLabsVoices.map((voice) => ({
  id: voice.voice_id,
  name: voice.voice_name,
  gender: voice.gender,
  avatar: voice.avatar_url,
  audio: voice.preview_audio_url,
  accent: voice.accent,
  // Additional properties can be added as needed
}));

import AgentSettingsForm from "@/components/agent/AgentSettingsForm";
import { retellClient } from "@/lib/retell";

export default async function AgentSettingsPage() {
  const voiceResponses = await retellClient.voice.list();

  const voices = voiceResponses
    .filter((v: any) => v.provider === "elevenlabs")
    .map((v: any) => ({
      id: v.voice_id,
      name: v.voice_name,
      gender: v.gender,
      accent: v.accent,
      avatar: v.avatar_url,
      audio: v.preview_audio_url,
    }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Agent Settings</h1>
      <AgentSettingsForm voices={voices} />
    </div>
  );
}

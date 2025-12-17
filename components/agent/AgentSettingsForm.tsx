"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import VoiceSelector from "./VoiceSelector";
import WorkingHours, { WorkingHour } from "./WorkingHours";

export default function AgentSettingsForm({ voices }: { voices: any[] }) {
  const [voice, setVoice] = useState<any>(null);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [beginMessage, setBeginMessage] = useState("");

  const handleSubmit = async () => {
    if (!voice) return toast.error("Select a voice");

    toast.success("Agent settings saved (demo)");
    // 👉 here you will:
    // 1. save data to Supabase
    // 2. create agent in Retell
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <VoiceSelector voices={voices} value={voice} onChange={setVoice} />

      <WorkingHours value={workingHours} onChange={setWorkingHours} />

      {/* Begin Message */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Begin Message</h3>
        <textarea
          rows={4}
          className="w-full border rounded-xl p-3"
          placeholder="Hello, thank you for calling our dental clinic..."
          value={beginMessage}
          onChange={(e) => setBeginMessage(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-black text-white rounded-xl"
      >
        Save Agent Settings
      </button>
    </div>
  );
}

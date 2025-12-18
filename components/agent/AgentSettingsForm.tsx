"use client";

import client from "@/app/api/client";
import { retellClient } from "@/lib/retell";
import { useState } from "react";
import toast from "react-hot-toast";
import VoiceSelector from "./VoiceSelector";

export default function AgentSettingsForm({ voices }: { voices: any[] }) {
  const [voice, setVoice] = useState<any>(null);
  const [workingHours, setWorkingHours] = useState("");
  const [beginMessage, setBeginMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!voice) return toast.error("Select a voice");

    setLoading(true);

    const llmResponse = await retellClient.llm.create({
      model: "gpt-4.1",
      general_prompt: `Generate a professional and friendly greeting message for a dental clinic. The message should welcome patients, mention the clinic's commitment to quality care, and encourage them to schedule an appointment. Keep it concise and warm.
      working_hours: ${workingHours}
      `,
      begin_message: beginMessage,
    });
    const agentResponse = await retellClient.agent.create({
      response_engine: { llm_id: llmResponse.llm_id, type: "retell-llm" },
      voice_id: voice.id,
      agent_name: "Dental Clinic Agent",
    });

    // 🔐 current user
    const {
      data: { user },
    } = await client.auth.getUser();

    if (!user) {
      setLoading(false);
      return toast.error("Not authenticated");
    }

    const { error } = await client.from("agent_settings").upsert(
      {
        user_id: user.id,
        voice_id: voice.id,
        working_hours: workingHours,
        agent_response: agentResponse.agent_id,
      },
      {
        onConflict: "user_id",
      }
    );

    setLoading(false);

    if (error) {
      console.error(error);
      return toast.error("Failed to save settings");
    }

    toast.success("Agent settings saved successfully");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <VoiceSelector voices={voices} value={voice} onChange={setVoice} />

      {/* Working Hours */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Working Hours</h3>
        <textarea
          rows={2}
          className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="Monday to Saturday from 8:00 AM to 7:00 PM. Closed on Sunday."
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
        />
      </div>

      {/* Begin Message */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Begin Message</h3>
        <textarea
          rows={4}
          className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="Hello, thank you for calling our dental clinic..."
          value={beginMessage}
          onChange={(e) => setBeginMessage(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-3 primary-button rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Agent Settings"}
      </button>
    </div>
  );
}

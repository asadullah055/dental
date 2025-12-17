import client from "@/app/api/client";
import { ClinicSettings } from "./settings.types";

/* 🔹 Create Retell AI Agent */
export const createRetellAgent = async (voice: "male" | "female") => {
  // ⚠️ example – actual API call will depend on Retell docs
  const res = await fetch("/api/retell/create-agent", {
    method: "POST",
    body: JSON.stringify({ voice }),
  });

  if (!res.ok) throw new Error("Failed to create AI agent");

  const data = await res.json();
  return data.agentId;
};

/* 🔹 Save clinic settings */
export const saveClinicSettings = async (settings: ClinicSettings) => {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  // 1️⃣ Create Retell Agent
  const agentId = await createRetellAgent(settings.aiVoice);

  // 2️⃣ Save everything to Supabase
  const { error } = await client.from("company_settings").upsert({
    id: user.id,
    clinic_name: settings.clinicName,
    services: settings.services,
    phone: settings.phone,
    address: settings.address,
    city: settings.city,
    country: settings.country,
    website: settings.website,
    about: settings.about,

    working_days: settings.workingDays,
    opening_time: settings.openingTime,
    closing_time: settings.closingTime,

    ai_voice: settings.aiVoice,
    retell_agent_id: agentId,

    updated_at: new Date(),
  });

  if (error) throw error;
};

"use client";

import client from "@/app/api/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { voiceList } from "./retell/voiceList";

interface CompanySettings {
  clinicName: string;
  dentalServices: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  website: string;
  aboutClinic: string;
}

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<CompanySettings>({
    clinicName: "",
    dentalServices: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    website: "",
    aboutClinic: "",
  });
  
  /* 🔹 Handle input change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  /* 🔹 Save to Supabase */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!settings.clinicName || !settings.phone || !settings.address) {
      toast.error("Please fill all required clinic details");
      return;
    }

    setLoading(true);

    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError || !user) {
      toast.error("Authentication required");
      setLoading(false);
      return;
    }

    const { error } = await client.from("company_settings").upsert({
      id: user.id,
      clinic_name: settings.clinicName,
      services: settings.dentalServices,
      phone: settings.phone,
      address: settings.address,
      city: settings.city,
      country: settings.country,
      website: settings.website,
      about: settings.aboutClinic,
      updated_at: new Date(),
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Dental clinic profile updated successfully 🦷");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* 🔥 Dental Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dental Clinic Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your clinic information visible to patients
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Clinic Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Clinic Name *
            </label>
            <input
              name="clinicName"
              value={settings.clinicName}
              onChange={handleChange}
              placeholder="Smile Care Dental Clinic"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Dental Services */}
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Dental Services Offered
            </label>
            <input
              name="dentalServices"
              value={settings.dentalServices}
              onChange={handleChange}
              placeholder="Teeth cleaning, Braces, Root canal, Whitening"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Clinic Contact Number *
            </label>
            <input
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="+880 1XXXXXXXXX"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Clinic Address *
            </label>
            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows={3}
              placeholder="Street, area, building number"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700">
                City
              </label>
              <input
                name="city"
                value={settings.city}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">
                Country
              </label>
              <input
                name="country"
                value={settings.country}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Clinic Website (Optional)
            </label>
            <input
              name="website"
              value={settings.website}
              onChange={handleChange}
              placeholder="https://yourclinic.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-bold text-gray-700">
              About the Clinic
            </label>
            <textarea
              name="aboutClinic"
              value={settings.aboutClinic}
              onChange={handleChange}
              rows={4}
              placeholder="Brief description about your dental clinic, doctors and experience"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="primary-button w-full py-3 rounded-lg font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Clinic Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

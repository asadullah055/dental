"use client";

import { Check, Play } from "lucide-react";
import { useMemo, useState } from "react";
import FilterDropdown from "./FilterDropdown";

interface Voice {
  id: string;
  name: string;
  gender: string;
  accent?: string;
  avatar?: string;
  audio?: string;
}

interface Props {
  voices: Voice[];
  value?: Voice;
  onChange: (voice: Voice) => void;
}

export default function VoiceSelector({ voices, value, onChange }: Props) {
  const [gender, setGender] = useState("");
  const [accent, setAccent] = useState("");
  const [search, setSearch] = useState("");

  const genderOptions = ["male", "female"];

  // accent options (dynamic – আগের মতো)
  const accentOptions = useMemo(
    () =>
      Array.from(new Set(voices.map((v) => v.accent).filter(Boolean))).sort(),
    [voices]
  );

  // ✅ Filter logic
  const filteredVoices = voices.filter((v) => {
    if (gender && v.gender !== gender) return false;
    if (accent && v.accent !== accent) return false;
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  // 🔊 Play voice
  const playVoice = (audio?: string) => {
    if (!audio) return;
    new Audio(audio).play();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Agent Voice</h3>

      {/* Filters */}
      <div className="flex gap-3 items-center">
        {/* Gender */}
        <FilterDropdown
          options={genderOptions}
          value={gender}
          placeholder="All Gender"
          onChange={setGender}
        />

        {/* Accent */}
        <FilterDropdown
          options={accentOptions}
          value={accent}
          placeholder="All Accent"
          onChange={setAccent}
        />

        {/* Search */}
        <input
          placeholder="Search voice..."
          className="ml-auto border border-gray-200 rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:ring-1 focus:ring-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="max-h-[460px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className=" text-gray-800 text-center">
                <th className="px-4 py-3">Voice</th>
                <th className="px-4 py-3">Trait</th>
                <th className="px-4 py-3">Voice ID</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>

            <tbody>
              {filteredVoices.map((voice) => {
                const selected = value?.id === voice.id;

                return (
                  <tr
                    key={voice.id}
                    className={`border-t border-gray-300 bg-white hover:bg-gray-100 ${
                      selected ? "bg-blue-50/40" : ""
                    }`}
                  >
                    {/* Voice */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      {/* ▶ Play */}
                      <button
                        onClick={() => playVoice(voice.audio)}
                        className="cursor-pointer"
                      >
                        <Play size={18} className="font-bold" />
                      </button>

                      <img
                        src={voice.avatar || "/avatar-placeholder.png"}
                        className="w-8 h-8 rounded-full"
                      />

                      <span className="font-semibold text-gray-800">
                        {voice.name}
                      </span>
                    </td>

                    {/* Traits */}
                    <td className="px-4 py-3">
                      <div className="flex gap-2 flex-wrap">
                        {voice.accent && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 font-semibold rounded-full text-xs">
                            {voice.accent}
                          </span>
                        )}
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 font-semibold rounded-full text-xs">
                          {voice.gender === "male" ? "Male" : "Female"}
                        </span>
                      </div>
                    </td>

                    {/* Voice ID */}
                    <td className="px-4 py-3 text-gray-800">{voice.id}</td>

                    {/* Action */}
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          onChange(voice);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow
                          text-sm font-medium border border-gray-300 ml-auto cursor-pointer
                          ${
                            selected
                              ? "bg-white text-gray-800"
                              : "bg-white text-gray-800"
                          }`}
                      >
                        {selected && <Check size={16} />}
                        {selected ? "Using Voice" : "Use Voice"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

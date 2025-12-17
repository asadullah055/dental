"use client";

import { useState } from "react";
import { X, Play } from "lucide-react";

type Voice = {
  id: string;
  name: string;
  accent?: string;
  age?: string;
  provider: string;
  avatar?: string;
  audio?: string;
};

interface Props {
  voices: Voice[];
  onSelect: (voice: Voice) => void;
  onClose: () => void;
}

export default function VoiceSelectorModal({
  voices,
  onSelect,
  onClose,
}: Props) {
  const [provider, setProvider] = useState("elevenlabs");
  const [search, setSearch] = useState("");

  const filtered = voices.filter(
    (v) =>
      v.provider === provider &&
      v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Select Voice</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Provider Tabs */}
        <div className="flex gap-6 px-6 pt-4 text-sm font-medium border-b">
          {["elevenlabs", "cartesia", "minimax", "openai"].map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`pb-3 capitalize ${
                provider === p
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="px-6 py-4 flex gap-3 items-center">
          <button className="primary-button">+ Add custom voice</button>

          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Gender</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Accent</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Types</option>
          </select>

          <input
            placeholder="Search..."
            className="ml-auto border rounded-lg px-3 py-2 text-sm w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Recommended */}
        <div className="px-6">
          <p className="text-sm font-medium mb-2">Recommended Voices</p>
          <div className="flex gap-4 mb-4">
            {filtered.slice(0, 2).map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-3 border rounded-lg p-3 w-64"
              >
                <img
                  src={v.avatar}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{v.name}</p>
                  <p className="text-xs text-gray-500">
                    {v.accent} · {v.age}
                  </p>
                </div>
                {v.audio && (
                  <button
                    onClick={() => new Audio(v.audio).play()}
                    className="border rounded-md p-1"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="px-6 pb-6 max-h-[380px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="text-left text-gray-500">
                <th className="py-3 px-2">Voice</th>
                <th>Trait</th>
                <th>Voice ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-2 flex items-center gap-3">
                    <img
                      src={v.avatar}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{v.name}</span>
                  </td>
                  <td className="text-gray-600">
                    {v.accent} · {v.age} · Retell
                  </td>
                  <td className="text-gray-500">{v.id}</td>
                  <td className="text-right">
                    <button
                      onClick={() => onSelect(v)}
                      className="primary-button"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

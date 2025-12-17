"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export default function AccentDropdown({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-44 text-sm">
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between 
                   border rounded-lg px-3 py-2 bg-white"
      >
        <span>{value || "All Accent"}</span>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg overflow-hidden">
          {/* All */}
          <li
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="px-3 py-2 flex items-center gap-2 
                       hover:bg-gray-50 cursor-pointer"
          >
            <Check
              size={14}
              className={value === "" ? "opacity-100" : "opacity-0"}
            />
            All Accent
          </li>

          {options.map((acc) => (
            <li
              key={acc}
              onClick={() => {
                onChange(acc);
                setOpen(false);
              }}
              className="px-3 py-2 flex items-center gap-2 
                         hover:bg-gray-50 cursor-pointer capitalize"
            >
              <Check
                size={14}
                className={value === acc ? "opacity-100" : "opacity-0"}
              />
              {acc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  options: string[];
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
}

export default function FilterDropdown({
  options,
  value,
  placeholder,
  onChange,
}: Props) {
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
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between
                   border rounded-lg px-3 py-2 bg-white"
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg">
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
            {placeholder}
          </li>

          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-3 py-2 flex items-center gap-2
                         hover:bg-gray-50 cursor-pointer"
            >
              <Check
                size={14}
                className={value === opt ? "opacity-100" : "opacity-0"}
              />
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

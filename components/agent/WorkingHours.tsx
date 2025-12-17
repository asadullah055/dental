"use client";

export interface WorkingHour {
  days: string;
  from: string;
  to: string;
}

interface Props {
  value: WorkingHour[];
  onChange: (val: WorkingHour[]) => void;
}

export default function WorkingHours({ value, onChange }: Props) {
  const addRow = () => {
    onChange([...value, { days: "", from: "", to: "" }]);
  };

  const updateRow = (i: number, key: keyof WorkingHour, val: string) => {
    const updated = [...value];
    updated[i][key] = val;
    onChange(updated);
  };

  const removeRow = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Working Hours</h3>

      {value.map((row, i) => (
        <div key={i} className="flex gap-3 items-center">
          <input
            placeholder="Monday - Tuesday"
            className="border rounded-lg px-3 py-2 w-48"
            value={row.days}
            onChange={(e) => updateRow(i, "days", e.target.value)}
          />
          <input
            type="time"
            className="border rounded-lg px-3 py-2"
            value={row.from}
            onChange={(e) => updateRow(i, "from", e.target.value)}
          />
          <input
            type="time"
            className="border rounded-lg px-3 py-2"
            value={row.to}
            onChange={(e) => updateRow(i, "to", e.target.value)}
          />
          <button onClick={() => removeRow(i)} className="text-red-500 text-sm">
            ✕
          </button>
        </div>
      ))}

      <button onClick={addRow} className="text-sm px-4 py-2 border rounded-lg">
        + Add Working Time
      </button>
    </div>
  );
}

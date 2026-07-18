"use client";

interface Props {
  value: string;
  onChange: (tab: string) => void;
}

const tabs = [
  {
    key: "low",
    label: "Low Stock",
  },
  {
    key: "expiry",
    label: "Expiry",
  },
  {
    key: "history",
    label: "Stock History",
  },
];

export default function InventoryTabs({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 border-b">

      {tabs.map(tab => (

        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`border-b-2 px-5 py-3 transition

            ${
              value === tab.key
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-black"
            }

          `}
        >
          {tab.label}

        </button>

      ))}

    </div>
  );
}
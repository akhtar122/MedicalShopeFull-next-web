"use client";

import {
  FileSpreadsheet,
  FileText,
  Printer,
} from "lucide-react";

interface Props {
  onExcel?: () => void;
  onPdf?: () => void;
}

export default function ExportButtons({
  onExcel,
  onPdf,
}: Props) {
  return (
    <div className="flex gap-3">

      <button
        onClick={onExcel}
        className="flex items-center gap-2 rounded-lg border px-4 py-2"
      >
        <FileSpreadsheet size={18} />

        Excel

      </button>

      <button
        onClick={onPdf}
        className="flex items-center gap-2 rounded-lg border px-4 py-2"
      >
        <FileText size={18} />

        PDF

      </button>

      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        <Printer size={18} />

        Print

      </button>

    </div>
  );
}
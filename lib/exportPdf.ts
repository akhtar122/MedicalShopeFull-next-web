import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

interface PdfColumn {
  header: string;
  dataKey: string;
}

interface ExportPdfOptions {
  title: string;
  fileName: string;
  columns: PdfColumn[];
  rows: RowInput[];
}

export function exportToPdf({
  title,
  fileName,
  columns,
  rows,
}: ExportPdfOptions) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth =
    doc.internal.pageSize.getWidth();

  const pageHeight =
    doc.internal.pageSize.getHeight();

  /*
   * Header
   */

  doc.setFontSize(18);

  doc.setFont("helvetica", "bold");

  doc.text(
    title,
    14,
    18
  );

  doc.setFontSize(9);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    25
  );

  /*
   * Table
   */

  autoTable(doc, {
    startY: 32,

    columns,

    body: rows,

    theme: "grid",

    styles: {
      fontSize: 8,
      cellPadding: 3,
    },

    headStyles: {
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },

    margin: {
      left: 14,
      right: 14,
    },

    didDrawPage: () => {
      doc.setFontSize(8);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        `Page ${doc.getNumberOfPages()}`,
        pageWidth - 30,
        pageHeight - 8
      );
    },
  });

  doc.save(`${fileName}.pdf`);
}
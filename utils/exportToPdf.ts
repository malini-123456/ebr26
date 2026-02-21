// src/utils/exportToPdf.ts
import type { Table } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable, { type RowInput } from 'jspdf-autotable';

export type PdfExportOptions<TData> = {
  fileName?: string;                // default: table-export-YYYYMMDD-HHMM.pdf
  title?: string;                   // title shown at top of page
  subtitle?: string;                // optional subtitle
  orientation?: 'p' | 'portrait' | 'l' | 'landscape';
  unit?: 'pt' | 'mm' | 'cm' | 'in';
  format?: 'a4' | 'letter' | number[]; // pdf page format
  /**
   * Which rows to export:
   *  - 'all' → table.getRowModel()
   *  - 'filtered' → table.getFilteredRowModel()
   *  - 'selected' → table.getFilteredSelectedRowModel() (common UX)
   */
  rows?: 'all' | 'filtered' | 'selected';
  /**
   * Whether to only include columns that are currently visible.
   * If false, will include all leaf columns.
   */
  onlyVisibleColumns?: boolean;

  /**
   * Map raw cell value to a display string (per column id).
   * Useful for formatting currency, dates, badges, etc.
   */
  cellFormatters?: Partial<Record<string, (value: unknown) => string>>;
};

function defaultFileName() {
  const pad = (n: number) => String(n).padStart(2, '0');
  const d = new Date();
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `table-export-${y}${m}${day}-${hh}${mm}.pdf`;
}

export function exportTableToPDF<TData>(
  table: Table<TData>,
  {
    fileName,
    title,
    subtitle,
    orientation = 'portrait',
    unit = 'pt',
    format = 'a4',
    rows = 'selected',
    onlyVisibleColumns = true,
    cellFormatters,
  }: PdfExportOptions<TData> = {}
) {
  // 1) Decide which rows to export
  const rowModel =
    rows === 'all'
      ? table.getRowModel()
      : rows === 'filtered'
      ? table.getFilteredRowModel()
      : table.getFilteredSelectedRowModel();

  // 2) Decide which columns to include
  const leafColumns = table.getAllLeafColumns().filter((col) =>
    onlyVisibleColumns ? col.getIsVisible() : true
  );

  // 3) Build header & body for autoTable
  const head = [
    leafColumns.map((col) => col.columnDef.meta?.label ?? col.id),
  ];

  const body: RowInput[] = rowModel.rows.map((row) => {
    return leafColumns.map((col) => {
      const v = row.getValue(col.id);
      const formatter = cellFormatters?.[col.id];
      if (formatter) return formatter(v);
      // Default stringify with safe fallbacks
      if (v == null) return '';
      if (typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean')
        return String(v);
      if (v instanceof Date) return v.toLocaleString();
      try {
        return JSON.stringify(v);
      } catch {
        return String(v);
      }
    });
  });

  // 4) Create doc and render
  const doc = new jsPDF({
    orientation,
    unit,
    format,
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  if (title) {
    doc.setFontSize(14);
    doc.text(title, pageWidth / 2, 32, { align: 'center' });
  }
  if (subtitle) {
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(subtitle, pageWidth / 2, title ? 48 : 36, { align: 'center' });
    doc.setTextColor(0);
  }

  autoTable(doc, {
    head,
    body,
    startY: title ? (subtitle ? 60 : 44) : 32,
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [240, 240, 240], textColor: 20 },
    // You can tweak column widths with columnStyles if needed
    // columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 'auto' }, ... }
    didDrawPage: (data) => {
      // Footer with page numbers
      const str = `Page ${doc.getNumberOfPages()}`;
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(str, pageWidth - 32, doc.internal.pageSize.getHeight() - 16);
      doc.setTextColor(0);
    },
  });

  // 5) Save
  doc.save(fileName ?? defaultFileName());
}
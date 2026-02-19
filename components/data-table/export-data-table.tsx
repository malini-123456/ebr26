import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { Table } from "@tanstack/react-table"

interface ExportOptions {
  title?: string
  exportedBy?: string
  fileName?: string
}

export function exportTableToPDF<TData>(
  table: Table<TData>,
  options?: ExportOptions
) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()

  const title = options?.title ?? "Report"
  const exportedBy = options?.exportedBy ?? "System"
  const fileName =
    options?.fileName ??
    `report-${new Date().toISOString().split("T")[0]}.pdf`

  // -------- TITLE --------
  doc.setFontSize(18)
  doc.text(title, pageWidth / 2, 40, { align: "center" })

  doc.setFontSize(10)
  doc.text(`Exported by: ${exportedBy}`, pageWidth / 2, 60, {
    align: "center",
  })

  doc.text(
    `Exported on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    pageWidth / 2,
    75,
    { align: "center" }
  )

  // -------- TABLE DATA --------

  const visibleColumns = table
    .getAllLeafColumns()
    .filter((col) => col.getIsVisible())

  const headers = visibleColumns.map((col) =>
    typeof col.columnDef.header === "string"
      ? col.columnDef.header
      : col.id
  )

  const rows = table.getFilteredRowModel().rows.map((row) =>
    visibleColumns.map((col) => {
      const value = row.getValue(col.id)

      if (value instanceof Date) {
        return value.toLocaleDateString()
      }

      if (typeof value === "object") {
        return JSON.stringify(value)
      }

      return value ?? ""
    })
  )

  autoTable(doc, {
    startY: 100,
    head: [headers],
    body: rows,
    theme: "striped",
    styles: {
      fontSize: 9,
      cellPadding: 6,
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { left: 40, right: 40 },
    didDrawPage: function () {
      const pageCount = doc.getNumberOfPages()
      const pageHeight = doc.internal.pageSize.getHeight()

      doc.setFontSize(9)
      doc.text(
        `Page ${doc.getCurrentPageInfo().pageNumber} of ${pageCount}`,
        pageWidth - 40,
        pageHeight - 10,
        { align: "right" }
      )
    },
  })

  doc.save(fileName)
}

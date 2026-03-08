export function groupIpmByMonth(ipmRecords: { createdAt: Date }[]) {
  const map: Record<string, number> = {}

  ipmRecords.forEach((item) => {
    const date = new Date(item.createdAt)

    const month = date.toLocaleString("default", { month: "short" })

    map[month] = (map[month] || 0) + 1
  })

  return Object.entries(map).map(([month, total]) => ({
    month,
    total
  }))
}
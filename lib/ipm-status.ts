export function getIpmStatus(date?: Date | string | null) {
  if (!date) return "danger"

  const created = new Date(date)
  if (Number.isNaN(created.getTime())) return "danger"

  const now = new Date()
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)

  if (diffDays <= 90) return "good"
  if (diffDays <= 180) return "warning"
  return "expired"
}
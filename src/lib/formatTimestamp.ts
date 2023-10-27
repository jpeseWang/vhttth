export function formatTimeStamp(dateString: string) {
  const inputDate = new Date(dateString)

  const day = inputDate.getUTCDate()
  const month = inputDate.getUTCMonth() + 1 // Months are zero-based, so add 1.
  const year = inputDate.getUTCFullYear()

  return `${day} - ${month} - ${year}`
}

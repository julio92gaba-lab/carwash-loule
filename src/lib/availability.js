function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function toHHMM(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0')
  const m = String(minutes % 60).padStart(2, '0')
  return `${h}:${m}`
}

export function getAvailableSlots({
  date,
  durationMinutes,
  existingBookings = [],
  blockedPeriods = [],
  businessHours,
  slotIntervalMinutes,
  simultaneousCapacity,
}) {
  const hours = businessHours[String(date.getDay())]
  if (!hours) return []

  if (blockedPeriods.some((p) => p.start == null)) return []

  const openMin = toMinutes(hours.open)
  const closeMin = toMinutes(hours.close)

  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  const slots = []

  for (let start = openMin; start + durationMinutes <= closeMin; start += slotIntervalMinutes) {
    if (isToday && start <= nowMinutes) continue

    const end = start + durationMinutes

    const overlapping = existingBookings.filter((b) => {
      const bStart = toMinutes(b.start)
      const bEnd = bStart + b.durationMinutes
      return start < bEnd && end > bStart
    })
    if (overlapping.length >= simultaneousCapacity) continue

    const blocked = blockedPeriods.some((p) => {
      const pStart = toMinutes(p.start)
      const pEnd = toMinutes(p.end)
      return start < pEnd && end > pStart
    })
    if (blocked) continue

    slots.push(toHHMM(start))
  }

  return slots
}

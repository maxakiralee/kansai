import Link from 'next/link'

function addDays(date: Date, days: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

function formatWeekday(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: 'short' })
}

function formatISODate(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function CalendarGrid({ startDate }: { startDate: Date }) {
  const days = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i))
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {days.map((d) => (
        <Link
          key={d.toISOString()}
          href={`/trip/day/${formatISODate(d)}`}
          className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="text-sm text-neutral-500">{formatWeekday(d)}</div>
          <div className="text-2xl font-semibold">{d.getDate()}</div>
        </Link>
      ))}
    </div>
  )
}



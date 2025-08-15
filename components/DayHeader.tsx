export function DayHeader({ isoDate }: { isoDate: string }) {
  // Parse YYYY-MM-DD as a local date to avoid UTC off-by-one
  const [y, m, da] = isoDate.split('-').map((n) => parseInt(n, 10))
  const d = new Date(y, (m || 1) - 1, da || 1)
  const title = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
  const isToday = new Date().toDateString() === d.toDateString()
  return (
    <div className="flex items-center justify-between mt-3 ml-5 mb-12">
      <h1 className="text-xl font-medium">{title}</h1>
      {isToday && <span className="px-2 py-1 text-xs rounded-full bg-neutral-100">today</span>}
    </div>
  )
}



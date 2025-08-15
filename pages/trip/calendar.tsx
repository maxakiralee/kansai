import Link from 'next/link'
import Image from 'next/image'

// Import the file directly so it works even if it's not in /public
// Next will emit a URL we can use in CSS
// If you later move the file into /public, you can remove this import and keep the same style key
import snoopyBg from '@/snoopyBackground.jpeg'
function toIso(date: Date) {
  return date.toISOString().slice(0, 10)
}

export default function TripCalendarPage() {
  // Trip always starts on March 11 (local convention)
  const now = new Date()
  const baseDate = new Date(Date.UTC(now.getUTCFullYear(), 2, 11)) // March is month index 2
  const year = baseDate.getUTCFullYear()
  const month = baseDate.getUTCMonth() // 0-based

  const startDay = 11
  const endDay = 19

  const firstDate = new Date(Date.UTC(year, month, startDay))
  const lastDate = new Date(Date.UTC(year, month, endDay))
  // Sunday-first grid (Sun=0..Sat=6)
  // Shift left by one so that 16 lands at the far right of the first row
  const startOffset = (firstDate.getUTCDay() + 6) % 7
  const endOffset = 6 - lastDate.getUTCDay()

  const cells: Array<{ label: string; href: string }> = []
  // Days 11..19 only
  for (let d = startDay; d <= endDay; d += 1) {
    const dObj = new Date(Date.UTC(year, month, d))
    cells.push({ label: String(d), href: `/trip/day/${toIso(dObj)}` })
  }
  // Grid positioning helpers
  const startCol = startOffset + 1 // CSS grid columns are 1-based

  return (
    <main
      className="safe-area-pads min-h-screen flex flex-col items-center justify-start content-above-overlay relative overflow-hidden"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 25vh)' }}
    >
      <Link
        href="/trip/calendar"
        className="absolute top-4 right-4 z-10 rounded-full px-6 py-2 text-xl shadow-sm"
        style={{
          background: 'var(--nude)',
          border: '4px solid var(--wood-700)',
          color: 'var(--wood-900)'
        }}
      >
        Home
      </Link>
      <div className="absolute inset-0 -z-10">
        <Image
          src={(snoopyBg as any).src || '/snoopyBackground.jpeg'}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'fill', objectPosition: 'center', userSelect: 'none', pointerEvents: 'none' }}
        />
      </div>
        <div className="w-full max-w-2xl px-6">
          <h1 className={`text-5xl mb-10 text-center text-[color:var(--wood-900)]`}>week in Kansai :)</h1>
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {cells.map((c, idx) => {
            const dayNum = startDay + idx
            const dateObj = new Date(Date.UTC(year, month, dayNum))
            const weekday = dateObj.getUTCDay() // 0..6
            const row = Math.floor((startOffset + idx) / 7) + 1
            const col = ((startOffset + idx) % 7) + 1
            return (
              <Link
                key={c.href}
                href={c.href}
                style={{ gridColumnStart: col, gridRowStart: row }}
                className="aspect-square cute-card transition flex items-center justify-center text-2xl transform scale-[1.08]"
              >
                <div className="font-semibold text-[color:var(--wood-900)]">{c.label}</div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}



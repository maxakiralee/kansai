import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { DayHeader } from '@/components/DayHeader'
import { MemoryCard } from '@/components/MemoryCard'
import { AddMemoryModal } from '@/components/AddMemoryModal'

type EventRow = {
  id: string
  title: string | null
  body: string | null
  image_path: string | null
  created_at: string
}

export default function TripDayPage() {
  const router = useRouter()
  const { date } = router.query as { date?: string }
  const [items, setItems] = useState<Array<EventRow & { imageUrl: string | null }>>([])
  const spaceId = process.env.NEXT_PUBLIC_SPACE_ID || ''
  const supabase = createClient()

  function AutoFitWall({ items }: { items: Array<EventRow & { imageUrl: string | null }> }) {
    const n = Math.max(items.length, 1)
    const wrapperRef = useState<HTMLDivElement | null>(null)[0]
    const [scale, setScale] = useState(1)

    // Decide cols/rows for a poster-like layout
    const cols = n >= 10 ? 3 : n >= 4 ? 3 : n === 3 ? 3 : n === 2 ? 2 : 1
    const rows = Math.ceil(n / cols)

    useEffect(() => {
      function recalc() {
        const el = document.getElementById('wall-fit')
        if (!el) return
        const availW = el.clientWidth
        const availH = el.clientHeight
        const baseW = 120 // base card width in px
        const extra = 36 // extra room for tilt so cards don't overlap
        const cellW = baseW + extra
        const gap = 18
        const cardH = 210 // estimated card height (photo + caption)
        const naturalW = cols * cellW + (cols - 1) * gap
        const naturalH = rows * cardH + (rows - 1) * gap
        const s = Math.min(1, availW / naturalW, availH / naturalH)
        setScale(s)
      }
      recalc()
      window.addEventListener('resize', recalc)
      return () => window.removeEventListener('resize', recalc)
    }, [cols, rows, n])

    const baseW = 160
    const extra = 36
    const cellW = baseW + extra

    return (
      <div id="wall-fit" className="w-full h-full overflow-hidden">
        <div
          className="mx-auto grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellW}px)`,
            gap: '18px',
            transform: `scale(${scale})`,
            transformOrigin: 'center top',
            width: cols * cellW + (cols - 1) * 18,
          } as any}
        >
          {items.map((e) => (
            <div key={e.id} className="flex items-center justify-center">
              <div style={{ width: baseW }}>
                <MemoryCard id={e.id} body={e.body} imageUrl={e.imageUrl} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (!date) return
    ;(async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('space_id', spaceId)
        .eq('date', date)
        .order('created_at', { ascending: false })

      if (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return
      }

      const rows = (data as EventRow[] | null) || []
      const withUrls = await Promise.all(
        rows.map(async (e) => {
          if (!e.image_path) return { ...e, imageUrl: null }
          const { data: signed, error: se } = await supabase.storage
            .from('events')
            .createSignedUrl(e.image_path, 60 * 60 * 24 * 14)
          if (se) return { ...e, imageUrl: null }
          return { ...e, imageUrl: signed?.signedUrl ?? null }
        })
      )
      setItems(withUrls)
    })()
  }, [date, spaceId, supabase])

  return (
    <main className="safe-area-pads p-6 pt-16 min-h-screen content-above-overlay relative flex flex-col">
      <Link
        href="/trip/calendar"
        className="absolute top-4 right-4 z-10 rounded-full px-5 py-2 text-lg shadow-sm"
        style={{ background: 'var(--nude)', border: '4px solid var(--wood-700)', color: 'var(--wood-900)' }}
      >
        Home
      </Link>
      {date && <DayHeader isoDate={date} />}
      <div className="flex-1 w-full px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((e) => (
            <div key={e.id} className="flex items-start justify-center">
              <MemoryCard id={e.id} body={e.body} imageUrl={e.imageUrl} />
            </div>
          ))}
        </div>
      </div>
      {date && <AddMemoryModal spaceId={spaceId} date={date} onAdded={() => void 0} />}
    </main>
  )
}



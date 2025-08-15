'use client'

type ComicFlowerSpec = {
  left: number
  top: number
  size: number
  rotate?: number
  petals?: number
  petalFill?: string
  centerFill?: string
  stem?: boolean
  kind?: 'snoopy' | 'daisy' | 'blob'
}

const STROKE = '#6b4b35'

function DaisyFlower({ f }: { f: ComicFlowerSpec }) {
  const petals = f.petals ?? 8
  const ringRadius = 15
  const petalR = 10
  const angles = Array.from({ length: petals }).map((_, i) => (i * 2 * Math.PI) / petals)
  return (
    <svg
      width={f.size}
      height={f.size}
      viewBox="-30 -30 60 60"
      style={{ position: 'absolute', left: `${f.left}%`, top: `${f.top}%`, transform: `rotate(${f.rotate ?? 0}deg)`, opacity: 0.4 }}
    >
      {angles.map((a, i) => (
        <circle
          key={i}
          cx={Math.cos(a) * ringRadius}
          cy={Math.sin(a) * ringRadius}
          r={petalR}
          fill={f.petalFill ?? '#fff7a8'}
          stroke={STROKE}
          strokeWidth={2}
          strokeOpacity={0.8}
        />
      ))}
      <circle cx={0} cy={0} r={9} fill={f.centerFill ?? '#ffbf66'} stroke={STROKE} strokeWidth={2} strokeOpacity={0.8} />
    </svg>
  )
}


export default function BackgroundFlowers() {
  // Hardcoded Snoopy-like daisies (oval petals with thick outlines)
  const flowers: ComicFlowerSpec[] = [
    { kind: 'daisy', left: 5, top: 62, size: 250, petals: 8, petalFill: '#ffe7ed', centerFill: '#e46f9c' },
    { kind: 'daisy', left: 58, top: 8, size: 250, petals: 7, petalFill: '#ffe7ed', centerFill: '#e46f9c' },
    { kind: 'daisy', left: 40, top: 80, size: 180, petals: 10, petalFill: '#ffe680', centerFill: '#ffb84d' },
    { kind: 'daisy', left: 60, top: 52, size: 320, petals: 5, petalFill: '#7ec3ff', centerFill: '#ffd93d' },
    { kind: 'daisy', left: 20, top: 20, size: 130, petals: 7, petalFill: '#ff9aa6', centerFill: '#e84d6a' },
    { kind: 'daisy', left: 5, top: 2, size: 180, petals: 8, petalFill: '#ffffff', centerFill: '#ffd93d' },
  ]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {flowers.map((f, i) => {
        if (f.kind === 'daisy') return <DaisyFlower key={i} f={f} />
      })}
    </div>
  )
}




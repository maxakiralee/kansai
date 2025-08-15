import Image from 'next/image'
import { textureForId } from '@/lib/textures'

type Props = {
  id: string
  body?: string | null
  imageUrl?: string | null
  imagePath?: string | null
  actions?: React.ReactNode
  fitWidth?: boolean
  scale?: number
}

function hashToRange(input: string, min: number, max: number) {
  let h = 5381
  for (let i = 0; i < input.length; i += 1) h = (h * 33) ^ input.charCodeAt(i)
  const u = (h >>> 0) / 0xffffffff
  return min + u * (max - min)
}

export function MemoryCard({ id, body, imageUrl, actions, fitWidth, scale }: Props) {
  const bg = textureForId(id)
  const rot = hashToRange(id, -4, 4)
  return (
    <article
      className="memory-card p-1 mb-8 shadow-xl rounded-2xl"
      style={{
        width: fitWidth ? '100%' : 'min(50vw, 200px)',
        transform: `rotate(${rot.toFixed(2)}deg) scale(${(scale ?? 1).toFixed(3)})` as any,
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
      }}
    >
      {imageUrl && (
        <div className="relative overflow-hidden rounded-xl mb-3 bg-white" style={{ aspectRatio: '3/2' }}>
          <Image src={imageUrl} alt={body || ''} fill sizes="(max-width: 600px) 92vw, 520px" className="object-contain" />
        </div>
      )}
      {body && <p className={`text-sm text-[color:var(--wood-700)] whitespace-pre-wrap`}>{body}</p>}
      {actions && <div className="mt-2">{actions}</div>}
    </article>
  )}



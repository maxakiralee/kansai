import Image from 'next/image'

type Props = {
	id: string
	body?: string | null
	imageUrl?: string | null
	actions?: React.ReactNode
	fitWidth?: boolean
	scale?: number
}

export function MemoryCard({ id, body, imageUrl, actions, fitWidth, scale }: Props) {
	return (
		<article
			className="memory-card p-1 mb-8 shadow-xl rounded-2xl"
			style={{
				position: 'relative',
				width: fitWidth ? '100%' : 'min(50vw, 200px)',
				transform: `scale(${(scale ?? 1).toFixed(3)})` as any,
				backgroundColor: 'rgba(255,255,255,0.7)'
			}}
		>
			{imageUrl && (
				<div className="relative overflow-hidden rounded-xl mb-3 bg-white" style={{ aspectRatio: '3/2' }}>
					<Image src={imageUrl} alt={body || ''} fill sizes="(max-width: 600px) 92vw, 520px" className="object-contain" />
				</div>
			)}
			{body && <p className={`text-sm text-[color:var(--wood-700)] whitespace-pre-wrap`}>{body}</p>}
			{actions && (
				<div className="absolute bottom-1 right-2">
					{actions}
				</div>
			)}
		</article>
	)
}



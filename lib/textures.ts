const textures = [
  '/textures/paper-1.png',
  '/textures/paper-2.png',
  '/textures/paper-3.png',
  '/textures/paper-4.png',
]

function djb2Hash(input: string) {
  let hash = 5381
  for (let i = 0; i < input.length; i += 1) hash = (hash * 33) ^ input.charCodeAt(i)
  return hash >>> 0
}

export function textureForId(id: string) {
  const idx = textures.length ? djb2Hash(id) % textures.length : 0
  return textures[idx] || ''
}



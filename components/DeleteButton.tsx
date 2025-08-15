'use client'
import { getSupabaseBrowserClient } from '@/lib/supabase/client.browser'

export function DeleteButton({ id, imagePath, onDeleted }: { id: string; imagePath?: string | null; onDeleted: () => void }) {
  const supabase = getSupabaseBrowserClient()
  async function handleDelete() {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) return alert(error.message)
    if (imagePath) await supabase.storage.from('events').remove([imagePath])
    onDeleted()
  }
  return (
    <button className="text-xs text-red-600" onClick={handleDelete}>Delete</button>
  )
}



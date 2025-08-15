'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AddMemoryModal({ spaceId, date, onAdded }: { spaceId: string; date: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function handleSubmit() {
    setSaving(true)
    try {
      let image_path: string | undefined
      if (file) {
        const objectName = `${spaceId}/${date}/${crypto.randomUUID()}.jpg`
        const { error: upErr } = await supabase.storage.from('events').upload(objectName, file, { contentType: file.type })
        if (upErr) throw upErr
        image_path = objectName
      }
      const { data: userData } = await supabase.auth.getUser()
      const author_id = userData.user?.id
      const { error } = await supabase.from('events').insert({ space_id: spaceId, author_id, date, body, image_path })
      if (error) throw error
      setOpen(false); setBody(''); setFile(null); onAdded()
    } catch (e: any) {
      // eslint-disable-next-line no-alert
      alert(e?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <button className="fixed bottom-5 inset-x-0 mx-auto w-44 cute-button" onClick={() => setOpen(true)}>Add Memory</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="w-full sm:max-w-md bg-white rounded-2xl p-4 space-y-3">
            <textarea className="w-full border rounded p-2" placeholder="Caption" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-2" onClick={() => setOpen(false)} disabled={saving}>Cancel</button>
              <button className="px-4 py-2 cute-button" onClick={handleSubmit} disabled={saving || (!body && !file)}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}



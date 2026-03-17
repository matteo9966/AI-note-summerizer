import { useEffect, useState } from 'preact/hooks'
import './app.css'
import NoteForm from './components/NoteForm'
import Skeleton from './components/Skeleton'
import { createNote, getNotes } from './services/apiService'
import type { Note } from '@ai/types'

export function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getNotes()
        setNotes(data)
      } catch (err) {
        // ignore for now or add error handling
        console.error('Failed to load notes', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleCreate = async (note: { title: string; content: string }) => {
    try {
      const created = await createNote(note)
      setNotes((prev) => [created, ...prev])
    } catch (err) {
      console.error('Failed to create note', err)
    }
  }

  return (
    <>
      <div class="ticks"></div>
      <main class="mx-auto w-full max-w-4xl px-4 py-8">
        <section id="create-note" class="mb-8">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Create Note</h2>
          <NoteForm onSubmit={handleCreate} />
        </section>

        <section id="notes">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Notes</h2>
          {loading ? (
            <Skeleton rows={3} rowHeight={16} />
          ) : (
            <ul class="space-y-4">
              {notes.map((note) => (
                <li key={note.id} class="p-4 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-left">
                  <h3 class="text-lg font-medium text-slate-900 dark:text-slate-100">{note.title}</h3>
                  <p class="mt-1 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{note.content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}

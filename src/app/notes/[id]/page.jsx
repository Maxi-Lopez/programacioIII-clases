"use client"
import { useNotes } from '../NotesContext'
import { useParams, useRouter } from 'next/navigation'
import NoteDetail from '@/app/components/NoteDetail'
import React from 'react'

export default function page() {
  const { id } = useParams()
  const { getNoteById, deleteNote } = useNotes()

  const nota = getNoteById(id)

  const router = useRouter()

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      router.push("/notes")
      setTimeout(() => deleteNote(id), 100);
    }
  }

  return (
    <div className="flex flex-1 items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <NoteDetail note={nota} />

      <button onClick={handleDelete} className='absolute top-24 right-24 bg-red-500 text-white p-2 rounded-md cursor-pointer'>
        Delete Note
      </button>
    </div>
  )
}

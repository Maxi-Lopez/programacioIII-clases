"use client"
import { useState, useEffect } from 'react';
import { useNotes } from '../notes/NotesContext'

export default function NoteDetail({ note }) {
  const { updateNote } = useNotes()
  const [copied, setCopied] = useState(false);

  const [editingFiled, setEditingField] = useState(null) // "title" o "content" o "ejemplo" o "null"

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    ejemplo: ""
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        ejemplo: note.ejemplo || "",
      })
    }
  }, [note])


  const handleCopy = () => {
    if (note.ejemplo) {
      navigator.clipboard.writeText(note.ejemplo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    updateNote(note.id, formData)
    setEditingField(null)
  }

  const EditPencil = () => (
    <svg width="16" height="16" fill="currentColor" className="bi bi-pencil opacity-0 group-hover:opacity-100" viewBox="0 0 16 16">
      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
    </svg>
  )

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <div
          className='w-full hover:bg-zinc-800 transition-colors cursor-pointer rounded p-3 group'
          onDoubleClick={() => setEditingField("title")}
          title="Doble click para editar"
        >
          {editingFiled === "title" ? (
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              autoFocus
              className="max-w-xs text-3xl focus:outline-none focus:ring-2 focus:ring-green-300 w-full p-3 rounded m-1 font-semibold leading-10 tracking-tight text-black dark:text-zinc-50"
            />
          ) : (
            <div className='flex items-center gap-2'>
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                {note.title}
              </h1>
              <EditPencil />
            </div>
          )}
        </div>
      </div>

      <div
        className='w-full hover:bg-zinc-800 transition-colors cursor-pointer rounded p-3 group'
        onDoubleClick={() => setEditingField("content")}
        title="Doble click para editar"
      >

        {editingFiled === "content" ? (
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            autoFocus
            rows={5}
            className='text-justify focus:outline-none focus:ring-2 focus:ring-green-300 w-full p-3 rounded m-1 text-black dark:text-zinc-50'
            type="text"
          />
        ) : (
          <div className='flex gap-2 items-center'>
            <p className='text-justify'>
              {note.content}
            </p>
            <EditPencil />
          </div>
        )}

      </div>

      {/* Ejemplo de como funcionan */}
      <section
        className='w-full min-h-64 my-8 p-4 rounded-lg flex flex-col bg-zinc-800 text-white justify-between group cursor-pointer hover:ring-2 ring-zinc-600'
        onDoubleClick={() => setEditingField("ejemplo")}
        title="Doble click para editar"
      >
        <div className='flex justify-between'>
          <div className='flex gap-2 items-center'>
            <p className='text-lg font-semibold'>Ejemplo</p>
            <EditPencil />
          </div>
          <button
            onClick={handleCopy}
            className="top-2 right-2 cursor-pointer"
          >

            {copied ? (
              <svg width="20" height="20" fill="currentColor" className="bi bi-clipboard-check text-green-400" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
            )}
          </button>
        </div>
        <div className="mt-2 group text-green-500">

          {editingFiled === "ejemplo" ? (
            <textarea
              value={formData.ejemplo}
              onChange={(e) => setFormData({ ...formData, ejemplo: e.target.value })}
              autoFocus
              className='text-sm min-h-64 bg-black rounded p-2 overflow-x-auto w-full focus:outline-none focus:ring-2 ring-green-200 font-mono resize-none'
            />
          ) : (
            <pre className='text-sm min-h-64 bg-black rounded p-2 overflow-x-auto'>
              <code >
                {note.ejemplo}
              </code>
            </pre>
          )}
        </div>
      </section>

      {editingFiled && (
        <button
          onClick={handleSave}
          className='bg-green-600 hover:bg-green-500 px-3 py-2 rounded cursor-pointer text-white'
        >
          Save
        </button>
      )}

    </main>
  )
}
"use client"
import { useState } from 'react'
import { useNotes } from '../NotesContext'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import React from 'react'

function CreateNotePage() {
  const router = useRouter()



  const { addNote, getDynamicCategories } = useNotes()

  const categories = getDynamicCategories()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    ejemplo: "",
    category_id: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content) return alert("Title and content are required")

    addNote(formData)
    router.push("/notes")
  }


  return (
    <section className='flex p-20 justify-center items-center w-full'>
      <form className="flex flex-col flex-1  p-6 rounded-lg bg-zinc-800 font-sans">

        <Link href={"/notes"} className="self-start mb-4 text-white font-semibold">
          &larr; Back to Notes
        </Link>

        <p className="text-white text-lg font-semibold">Create Note</p>
        <div className='mt-10 flex flex-col gap-3'>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Title</label>
            <input
              type="text"
              placeholder='Title'
              className='p-2 border border-zinc-600 rounded-md my-4'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Category</label>
            <select
              className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: String(e.target.value) })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Content</label>
            <textarea
              placeholder='Content'
              className='p-2 border border-zinc-600 rounded-md my-4'
              rows={10}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Ejemplo</label>
            <textarea
              placeholder='Const variable = ....'
              className='p-2 border border-zinc-600 rounded-md my-4'
              rows={10}
              value={formData.ejemplo}
              onChange={(e) => setFormData({ ...formData, ejemplo: e.target.value })}
            />
          </div>

          <button onClick={handleSubmit} className='bg-blue-500 text-white p-2 rounded-md'>Save</button>
        </div>
      </form>

    </section>
  )
}

export default CreateNotePage
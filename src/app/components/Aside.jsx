"use client"
import { useState, useEffect } from 'react';
import { useNotes } from '../notes/NotesContext'

import Link from "next/link"

function CategorySection({ category }) {

  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex cursor-pointer items-center gap-2'
      >
        <h1 className='text-2xl font-semibold hover:text-zinc-500'>
          {category.title}
        </h1>
        <svg width="16" height="16" fill="currentColor" className={`bi bi-caret-down-fill ${isOpen ? "rotate-180" : "rotate-0"}`} viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>


      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <ul className=' overflow-hidden'>
          {category.notes.map((subItem, index) => (
            <li key={index} className="pl-4 cursor-pointer transition-all duration-200 hover:scale-105">
              <Link href={`/notes/${subItem.id}`}> {subItem.title} </Link>
            </li>
          ))}
          {
            category.notes.length === 0 && (
              <li className='text-sm text-zinc-400 p-3'>
                No hay notas aun...
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default function Aside({ data }) {

  const { addCategories } = useNotes()
  const [newCat, setNewCat] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (!newCat) return;
    addCategories(newCat)
  }

  const filteredData = data.map(category => {
    const filteredNotes = category.notes.filter(nota =>
      nota.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nota.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, notes: filteredNotes }
  }).filter(category =>
    category.notes.length > 0 ||
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-72 py-8 px-6 border-r border-zinc-700">
      <div>
        <h1 className="text-4xl font-bold">Notas</h1>
        <p>Todas nuestras notas</p>
      </div>

      <div className='relative w-full my-4'>
        
        <svg width="16" height="16" fill="currentColor" className="bi bi-search absolute left-3 top-3 text-zinc-400" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Buscar notas...'
          className=' focus:outline-none p-2 focus:ring-2 ring-green-400 rounded pl-9 bg-zinc-600'
        />
      </div>

      <div className="space-y-6 mt-8">
        {filteredData.map((item, index) => (
          <div className="border-b pb-6 border-zinc-700" key={index}>
            <CategorySection category={item} />
          </div>
        ))}
      </div>


      <form
        className='mt-8 pt-8'
        onSubmit={handleAddCategory}
      >

        <label className='text-sm text-zinc-400'>Agregar Categoría</label>
        <div className='flex gap-2'>
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder='Ej: Rutas...'
            className='focus:outline-none p-2 focus:ring-2 ring-green-400 rounded bg-zinc-600'
          />
          <button className='p-2 bg-zinc-600 rounded'>
            +
          </button>
        </div>
      </form>


    </aside>
  )
}
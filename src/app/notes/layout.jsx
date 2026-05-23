"use client"
import Aside from "@/app/components/Aside"
import { useNotes, NotesProvider } from "./NotesContext"

function LayoutContent({ children }) {
  const { getDynamicCategories } = useNotes()
  const categorias = getDynamicCategories()

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <Aside data={categorias} />
      {children}
    </div>
  )
}

export default function NotasLayout({ children }) {
  return (
    <NotesProvider>
      <LayoutContent>{children}</LayoutContent>
    </NotesProvider>
  )
}
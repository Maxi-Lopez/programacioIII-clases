import { createContext, useContext, useState, useEffect } from "react";
import { notes as defaultNotes, categories as defaultCategories } from "@/lib/notes";

const NotesContext = createContext();

export function NotesProvider({ children }) {

  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const savedNotes = window.localStorage.getItem("my_notes");
    const savedCategories = window.localStorage.getItem("my_categories");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      window.localStorage.setItem("my_notes", JSON.stringify(defaultNotes));
      setNotes(savedNotes);
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      window.localStorage.setItem("my_categories", JSON.stringify(defaultCategories));
      setCategories(savedCategories);
    }
  }, [])

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("my_notes", JSON.stringify(newNotes));
    }
  }

  const saveCategories = (newCategories) => {
    setCategories(newCategories);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("my_categories", JSON.stringify(newCategories));
    }
  }

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    const newNotes = [...notes, newNote];
    saveNotes(newNotes);
  }

  const updateNote = (id, updatedFields) => {
    const updatedNote = notes.map(note => 
      String(note.id) === String(id) ? { ...note, ...updatedFields } : note
    );
    saveNotes(updatedNote);
  }

  const deleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    saveNotes(filteredNotes);
  }

  const addCategories = (title) => {
    const newCategory = {
      id: crypto.randomUUID(),
      title
    }
    saveCategories([...categories, newCategory]);
  }

  const getNoteById = (id) => notes.find(note => String(note.id) === String(id))

  const getDynamicCategories = () => {
    return categories.map(category => ({
      ...category,
      notes: notes.filter(note => String(note.category_id) === String(category.id))
    }))
  }


  if (!isMounted) return null;

  return (
    <NotesContext.Provider value={{
      notes,
      categories,
      addNote,
      updateNote,
      deleteNote,
      addCategories,
      getNoteById,
      getDynamicCategories
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => useContext(NotesContext)

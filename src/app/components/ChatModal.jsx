"use client"
import { useState } from "react"
import { useNotes } from "@/app/notes/NotesContext"
import axios from 'axios'
import ReactMarkdown from "react-markdown"

export default function ChatModal({ isOpen, onClose }) {
  const { notes } = useNotes()
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      text: "¡Hola! ¿Qué deseas consultar sobre tus notas hoy?"
    }
  ])


  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!input.trim() || loading) return

    const userMessage = { id: crypto.randomUUID(), role: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post("/api/ai", {
        notes: notes,
        messages: [...messages, userMessage]
      })

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: response.data.result
      }])


    } catch (err) {
      setError(err.response?.data?.error || "Error al conectar con la IA")
    } finally {
      setLoading(false)
    }
  }


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
     bg-black/40 backdrop-blur-xs">

      <div className="w-full max-w-xl bg-zinc-900 border-zinc-700 rounded-lg
      p-4 flex flex-col h-125">

        <div className="flex justify-between items-center border-b border-zinc-700 
        pb-2 mb-2">
          <span className="font-bold text-sm">
            Itec IA
          </span>

          <button
            className="bg-zinc-700 px-2 py-1 rounded cursor-pointer"
            onClick={onClose}
          >
            Cerrar
          </button>

        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded p-2 max-w-[85%] 
            ${msg.role === "user" ? "bg-zinc-700 ml-auto" : "bg-purple-700"}`}
            >
              <p className="block text-xs text-zinc-400">{msg.role === "user" ? "Tú" : "IA"}</p>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {loading && <p>cargando...</p>}
          {error && <p>{error}</p>}
        </div>


        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-zinc-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-zinc-800 px-2 py-1.5 border border-zinc-600 
          rounded outline-none focus:border-purple-500"
          >
          </input>
          <button
            type="submit"
            disabled={loading || !input}
            className="bg-purple-600 px-3 py-1.5 rounded font-bold"
          >
            Enviar
          </button>
        </form>

      </div>
    </div>
  )
}

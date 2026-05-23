import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { notes, messages } = await request.json()

    const messagesFormateadas = messages
      .map(m => `${m.role === "user" ? "Usuario" : "Asistente IA"}: ${m.text}`)
      .join("\n")

    const notesFormateadas = notes
      .map(n => `-Titulo: ${n.title}\n contenido: ${n.content}`)
      .join("\n\n")

    const promptCompleto = `
        Eres "Itec AI" un modelo IA avanzado integrado en un sistema de notas y documentacion sobre desarrollo.
        Responde de forma sumamente tecnica a las dudas del usuario.
        Ve directo al grano.

        Tienes acceso a la base de datos del usuario, debes priorizar esta informacion para responder.

        NOTAS ACTUALES DEL USUARIO
        ${notesFormateadas}
        
        HISTORIAL DEL CHAT
        ${messagesFormateadas}
        
        responde al ultimo mensaje del usuario de forma conversacional. 
        si usas codigo usa bloques de markdown
    `

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Configuracion incompleta: FALTA EL API KEY!" }, { status: 500 })
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${apiKey}`

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptCompleto }] }]
      })
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      console.error("Error en la API de google:", data.error)
      return NextResponse.json({
        error: `Error en la API de google: ${data.error?.message}` || "Peticion invalida"
      }, { status: response.status || 400 })
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude generar una respuesta"

    return NextResponse.json({ success: true, result: aiText })

  } catch (error) {
    console.error("Error critico en la ruta /api/ai")
    return NextResponse.json({ error: "Error interno en el servidor al procesar la solicitud" }, { status: 500 })
  }
}
import { NextResponse } from "next/server"

export async function POST(request) {

    const { notes, messages } = await request.json()

    // Formatear mensajes del chat
    const messages_formateadas = messages
        .map(
            (e) =>
                `${e.role === "user" ? "Usuario" : "Asistente IA"}: ${e.content}`
        )
        .join("\n")

    // Formatear notas
    const notas_formateadas = notes
        .map(
            (note) =>
                `Título: ${note.title}\nContenido: ${note.content}`
        )
        .join("\n\n")

    console.log(messages_formateadas)
    console.log(notas_formateadas)

    return NextResponse.json({
        success: true,
        result: "ok."
    })
}
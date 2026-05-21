import Link from "next/link"

export default function NotasLayout({ children }) {

  const categorias = [
    { id: 1, title: "Rutas", notes: ["Rutas", "Rutas dinamicas", "Rutas anidadas"] },
    { id: 2, title: "Componentes", notes: ["Componentes de servidor", "Componentes de cliente"] },
    { id: 3, title: "Layouts", notes: ["Layout root", "Layouts anidados"] },
  ]

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <aside className="w-72 py-8 px-6 border-r border-zinc-700">
        <div>
          <h1 className="text-4xl font-bold">Notas</h1>
          <p>Todas nuestras notas</p>
        </div>

        <div className="space-y-6 mt-8">
          {categorias.map((categoria, index) => (
            <div className="border-b pb-6 border-zinc-700" key={index}>
              <h3 className="text-2xl font-semibold">
                {categoria.title}
              </h3>

              <ul>
                {categoria.notes.map((nota, index) => (
                  <li key={index} className="pl-4 cursor-pointer transition-all duration-200 hover:scale-105">
                    <Link href={`/notes/${nota.toLowerCase().replace(/\s+/g, "-")}`}> {nota} </Link>                 
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {children}
      
    </div>
  )
}
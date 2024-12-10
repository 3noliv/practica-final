import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Bienvenido a Bildy
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Navega por las opciones para administrar clientes, proyectos y
        albaranes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Link href="/clients">
          <div className="group relative bg-white text-black shadow-lg rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105">
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition"></div>
            <div className="relative p-6">
              <h2 className="text-2xl font-bold mb-2">Clientes</h2>
              <p className="text-gray-800 group-hover:text-white transition">
                Administra tus clientes registrados.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/projects">
          <div className="group relative bg-white text-black shadow-lg rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105">
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition"></div>
            <div className="relative p-6">
              <h2 className="text-2xl font-bold mb-2">Proyectos</h2>
              <p className="text-gray-800 group-hover:text-white transition">
                Gestiona los proyectos de tus clientes.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/deliverynotes">
          <div className="group relative bg-white text-black shadow-lg rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105">
            <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 transition"></div>
            <div className="relative p-6">
              <h2 className="text-2xl font-bold mb-2">Albaranes</h2>
              <p className="text-gray-800 group-hover:text-white transition">
                Crea y descarga albaranes en PDF.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

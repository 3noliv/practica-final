export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 fade-in">Bienvenido a la Gestión de Albaranes</h1>
      <p className="text-lg text-gray-700 mb-6 fade-in">
        Navega por las opciones del menú para administrar clientes, proyectos y albaranes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <h2 className="text-xl font-bold mb-2">Clientes</h2>
          <p className="text-gray-600">Administra tus clientes registrados.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-2">Proyectos</h2>
          <p className="text-gray-600">Gestiona los proyectos de tus clientes.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-2">Albaranes</h2>
          <p className="text-gray-600">Crea y descarga albaranes en PDF.</p>
        </div>
      </div>
    </div>
  );
}

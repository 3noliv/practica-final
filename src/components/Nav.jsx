"use client";

import Link from "next/link";
import AuthStatus from "./AuthStatus";

export default function Nav() {
  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-700">
        <img
          src="/logo.png" // Ruta al logo
          alt="MyApp Logo"
          className="h-10 w-10 mr-3"
        />
        <h1 className="text-2xl font-bold">MyApp</h1>
      </div>
      <ul className="flex-1 flex flex-col space-y-4 p-4">
        <li>
          <Link
            href="/"
            className="flex items-center space-x-3 hover:text-yellow-400 p-2 rounded"
          >
            <i className="fas fa-home"></i>
            <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link
            href="/clients"
            className="flex items-center space-x-3 hover:text-yellow-400 p-2 rounded"
          >
            <i className="fas fa-users"></i>
            <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className="flex items-center space-x-3 hover:text-yellow-400 p-2 rounded"
          >
            <i className="fas fa-project-diagram"></i>
            <span>Proyectos</span>
          </Link>
        </li>
        <li>
          <Link
            href="/deliverynotes"
            className="flex items-center space-x-3 hover:text-yellow-400 p-2 rounded"
          >
            <i className="fas fa-file-alt"></i>
            <span>Albaranes</span>
          </Link>
        </li>
      </ul>
      <AuthStatus /> {/* Agregamos AuthStatus al final del Nav */}
    </nav>
  );
}

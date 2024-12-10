"use client";

import Link from "next/link";
import AuthStatus from "./AuthStatus";

export default function Nav() {
  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen flex flex-col shadow-lg">
      <div className="flex items-center p-4 border-b border-gray-700">
        <img
          src="/logo.png" // Ruta al logo
          alt="MyApp Logo"
          className="h-10 w-10 mr-3"
        />
        <h1 className="text-2xl font-bold">Bildy</h1>
      </div>
      <ul className="flex-1 flex flex-col space-y-4 p-4">
        {[
          { href: "/", icon: "fas fa-home", label: "Inicio" },
          { href: "/clients", icon: "fas fa-users", label: "Clientes" },
          {
            href: "/projects",
            icon: "fas fa-project-diagram",
            label: "Proyectos",
          },
          {
            href: "/deliverynotes",
            icon: "fas fa-file-alt",
            label: "Albaranes",
          },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center space-x-3 p-2 rounded transition transform hover:scale-105 hover:bg-yellow-400 hover:text-gray-900"
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <AuthStatus /> {/* Agregamos AuthStatus al final del Nav */}
    </nav>
  );
}

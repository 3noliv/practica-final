"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthStatus() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login"); // Redirigir al login tras cerrar sesión
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center space-x-2 p-4">
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2 p-4">
      <p className="text-gray-500">Logueado como:</p>
      <p className="font-bold">{user?.name || "Usuario"}</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

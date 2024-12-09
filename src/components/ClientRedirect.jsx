"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

export default function ClientRedirect() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkClients = async () => {
      if (!isLoggedIn) return; // Si no hay sesión, no hacemos nada
      const token = localStorage.getItem("jwt");
      try {
        const response = await axios.get(
          "https://bildy-rpmaya.koyeb.app/api/client",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length === 0) {
          router.push("/clients/add"); // Redirigir si no hay clientes
        }
      } catch (error) {
        console.error("Error al verificar clientes:", error);
      }
    };

    checkClients();
  }, [isLoggedIn, router]);

  return null; // No renderizamos nada
}

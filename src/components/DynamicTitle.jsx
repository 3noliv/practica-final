"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const titles = {
      "/": "Bildy | Home",
      "/clients": "Bildy | Clientes",
      "/clients/add": "Bildy | Añadir Cliente",
      "/projects": "Bildy | Proyectos",
      "/projects/add": "Bildy | Añadir Proyecto",
      "/deliverynotes": "Bildy | Albaranes",
      "/deliverynotes/add": "Bildy | Añadir Albaran",
    };

    document.title = titles[pathname] || "Bildy";
  }, [pathname]);

  return null; // Este componente no renderiza nada visualmente
}

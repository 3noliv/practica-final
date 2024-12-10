"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const [isExiting, setIsExiting] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (currentPath !== pathname) {
      setIsExiting(true); // Activar la animación de salida
      setTimeout(() => {
        setIsExiting(false); // Terminar la animación de entrada
        setCurrentPath(pathname);
      }, 300); // Duración de la animación en ms
    }
  }, [pathname, currentPath]);

  return (
    <div
      className={`transition-all duration-300 ${
        isExiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}

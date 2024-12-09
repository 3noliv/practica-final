"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          `https://bildy-rpmaya.koyeb.app/api/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else {
          setError("No se pudo cargar el proyecto.");
        }
      } catch (error) {
        setError("Error al cargar los datos del proyecto.");
      }
    };

    fetchProject();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!project) {
    return <p className="text-gray-600">Cargando detalles del proyecto...</p>;
  }

  const { name, projectCode, clientId, address = {}, createdAt } = project;
  const {
    street = "No disponible",
    number = "-",
    postal = "-",
    city = "No disponible",
    province = "No disponible",
  } = address;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Información del Proyecto
          </h2>
          <p>
            <strong>Código interno:</strong> {projectCode}
          </p>
          <p>
            <strong>Cliente ID:</strong> {clientId}
          </p>
          <p>
            <strong>Creado en:</strong>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Dirección
          </h2>
          <p>
            <strong>Calle:</strong> {street}
          </p>
          <p>
            <strong>Número:</strong> {number}
          </p>
          <p>
            <strong>Código Postal:</strong> {postal}
          </p>
          <p>
            <strong>Ciudad:</strong> {city}
          </p>
          <p>
            <strong>Provincia:</strong> {province}
          </p>
        </div>
      </div>
    </div>
  );
}

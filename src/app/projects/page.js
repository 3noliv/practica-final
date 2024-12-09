"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [clients, setClients] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError(
        "No se encontró el token de sesión. Por favor, inicia sesión de nuevo."
      );
      return;
    }

    try {
      // Fetch proyectos
      const response = await axios.get(
        "https://bildy-rpmaya.koyeb.app/api/project",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projectsData = response.data;

      // Fetch clientes
      const clientsResponse = await axios.get(
        "https://bildy-rpmaya.koyeb.app/api/client",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const clientsData = clientsResponse.data.reduce((acc, client) => {
        acc[client._id] = client.name; // Mapear clientId con su nombre
        return acc;
      }, {});

      setProjects(projectsData);
      setAllProjects(projectsData); // Guardar todos los proyectos para búsqueda
      setClients(clientsData);
    } catch (error) {
      console.error("Error al cargar los datos:", error.message);
      setError("Error al cargar los datos. Por favor, intenta de nuevo.");
    }
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredProjects = allProjects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery)
    );
    setProjects(filteredProjects);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError(
        "No se encontró el token de sesión. Por favor, inicia sesión de nuevo."
      );
      return;
    }

    try {
      await axios.delete(`https://bildy-rpmaya.koyeb.app/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
      setAllProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error.message);
      setError("Error al eliminar el proyecto. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Proyectos</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Buscar proyecto..."
          onChange={handleSearch}
          className="border px-4 py-2 rounded w-1/2"
        />
        <Link
          href="/projects/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Proyecto
        </Link>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">NÚMERO</th>
            <th className="py-3 px-6 text-left">FECHA</th>
            <th className="py-3 px-6 text-left">NOMBRE</th>
            <th className="py-3 px-6 text-left">CLIENTE</th>
            <th className="py-3 px-6 text-left">CÓDIGO INTERNO</th>
            <th className="py-3 px-6 text-center">ACCIONES</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {projects.map((project, index) => (
            <tr
              key={project._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">{project.name}</td>
              <td className="py-3 px-6 text-left">
                {clients[project.clientId] || "Cliente desconocido"}
              </td>
              <td className="py-3 px-6 text-left">#{project._id}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function DeliveryNotes() {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeliveryNotes();
  }, []);

  const fetchDeliveryNotes = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("No se encontró el token de sesión. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.get(
        "https://bildy-rpmaya.koyeb.app/api/deliverynote",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const notesWithDetails = await Promise.all(
        response.data.map(async (note) => {
          const projectId =
            typeof note.projectId === "object"
              ? note.projectId._id
              : note.projectId;
          const projectName = projectId
            ? await fetchProjectName(projectId, token)
            : "Sin proyecto";

          const clientId =
            typeof note.clientId === "object"
              ? note.clientId._id
              : note.clientId;
          const clientName = clientId
            ? await fetchClientName(clientId, token)
            : "Sin cliente";

          return {
            ...note,
            projectName,
            clientName,
          };
        })
      );

      setDeliveryNotes(notesWithDetails);
    } catch (err) {
      console.error("Error al cargar los albaranes:", err.message);
      setError("Error al cargar los albaranes. Intenta de nuevo.");
    }
  };

  const fetchProjectName = async (projectId, token) => {
    if (!projectId || typeof projectId !== "string") {
      console.error(`ID de proyecto inválido: ${projectId}`);
      return "Sin proyecto";
    }
    try {
      const response = await axios.get(
        `https://bildy-rpmaya.koyeb.app/api/project/one/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.name || "Sin proyecto";
    } catch (err) {
      console.error(
        `Error al obtener el proyecto con ID ${projectId}:`,
        err.message
      );
      return "Sin proyecto";
    }
  };

  const fetchClientName = async (clientId, token) => {
    if (!clientId || typeof clientId !== "string") {
      console.error(`ID de cliente inválido: ${clientId}`);
      return "Sin cliente";
    }
    try {
      const response = await axios.get(
        `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.name || "Sin cliente";
    } catch (err) {
      console.error(
        `Error al obtener el cliente con ID ${clientId}:`,
        err.message
      );
      return "Sin cliente";
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");
    if (!id || typeof id !== "string") {
      console.error(`ID inválido para eliminar: ${id}`);
      return;
    }

    try {
      await axios.delete(
        `https://bildy-rpmaya.koyeb.app/api/deliverynote/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeliveryNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      console.error(`Error al eliminar el albarán con ID ${id}:`, err.message);
      alert("Error al eliminar el albarán. Intenta de nuevo.");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredNotes = deliveryNotes.filter((note) =>
    (note.projectName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Albaranes</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Buscar por nombre de proyecto..."
          value={search}
          onChange={handleSearch}
          className="border px-4 py-2 rounded w-1/2"
        />
        <Link
          href="/deliverynotes/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Añadir Albarán
        </Link>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">NÚMERO</th>
            <th className="py-3 px-6 text-left">FECHA</th>
            <th className="py-3 px-6 text-left">PROYECTO</th>
            <th className="py-3 px-6 text-left">CLIENTE</th>
            <th className="py-3 px-6 text-left">DESCARGAR</th>
            <th className="py-3 px-6 text-left">ELIMINAR</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredNotes.map((note, index) => (
            <tr
              key={note._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="py-3 px-6">
                {new Date(note.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">{note.projectName}</td>
              <td className="py-3 px-6">{note.clientName}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={async () => {
                    const token = localStorage.getItem("jwt");
                    if (!token) {
                      alert(
                        "No se encontró el token. Por favor, inicia sesión."
                      );
                      return;
                    }

                    try {
                      const response = await axios.get(
                        `https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${note._id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                          responseType: "blob", // Necesario para manejar el archivo como blob
                        }
                      );

                      // Crear un enlace para descargar el archivo
                      const url = window.URL.createObjectURL(
                        new Blob([response.data])
                      );
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute(
                        "download",
                        `Albarán-${note.projectName}.pdf`
                      ); // Nombre del archivo
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode.removeChild(link);
                    } catch (error) {
                      console.error("Error al descargar el PDF:", error);
                      alert("Hubo un error al descargar el PDF.");
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Descargar PDF
                </button>
              </td>

              <td className="py-3 px-6">
                <button
                  onClick={() => handleDelete(note._id)}
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

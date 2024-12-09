"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError(
        "No se encontró el token de sesión. Por favor, inicia sesión de nuevo."
      );
      return;
    }

    try {
      const response = await axios.get(
        "https://bildy-rpmaya.koyeb.app/api/client",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClients(response.data);
      setFilteredClients(response.data);
    } catch (error) {
      console.error("Error al cargar los clientes:", error.message);
      setError("Error al cargar los clientes. Por favor, intenta de nuevo.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(value)
    );
    setFilteredClients(filtered);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("No se encontró el token de sesión. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.delete(
        `https://bildy-rpmaya.koyeb.app/api/client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setClients((prevClients) =>
          prevClients.filter((client) => client._id !== id)
        );
        setFilteredClients((prevClients) =>
          prevClients.filter((client) => client._id !== id)
        );
      } else {
        throw new Error("Error al eliminar el cliente.");
      }
    } catch (error) {
      console.error("Error al eliminar el cliente:", error.message);
      setError("Error al eliminar el cliente. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={handleSearch}
          className="border px-4 py-2 rounded w-1/2"
        />
        <Link
          href="/clients/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Cliente
        </Link>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">NOMBRE</th>
            <th className="py-3 px-6 text-left">DOMICILIO FISCAL</th>
            <th className="py-3 px-6 text-left">CIF</th>
            <th className="py-3 px-6 text-center">ACCIONES</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredClients.map((client) => (
            <tr
              key={client._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{client.name}</td>
              <td className="py-3 px-6 text-left">
                {client.address?.street || "No disponible"}
              </td>
              <td className="py-3 px-6 text-left">{client.cif || "No CIF"}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDelete(client._id)}
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

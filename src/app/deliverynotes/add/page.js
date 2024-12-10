"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "../../../components/Modal";

export default function AddDeliveryNote() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [deliveryNote, setDeliveryNote] = useState({
    clientId: "",
    projectId: "",
    format: "material",
    material: "",
    hours: "",
    description: "",
    workdate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("No se encontró el token de sesión. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.get(
        "https://bildy-rpmaya.koyeb.app/api/project",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(response.data);
    } catch (err) {
      console.error("Error al cargar los proyectos:", err.message);
      setError("Error al cargar los proyectos. Intenta de nuevo.");
    }
  };

  const fetchClients = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("No se encontró el token de sesión. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.get(
        "https://bildy-rpmaya.koyeb.app/api/client",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClients(response.data);
    } catch (err) {
      console.error("Error al cargar los clientes:", err.message);
      setError("Error al cargar los clientes. Intenta de nuevo.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryNote({ ...deliveryNote, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    try {
      await axios.post(
        "https://bildy-rpmaya.koyeb.app/api/deliverynote",
        deliveryNote,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(true); // Mostrar modal tras guardar
    } catch (err) {
      console.error("Error al crear el albarán:", err.message);
      setError("Error al crear el albarán. Intenta de nuevo.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/deliverynotes"); // Redirigir a la lista de albaranes al cerrar el modal
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear Albarán</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <select
            name="clientId"
            value={deliveryNote.clientId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar Cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Proyecto
          </label>
          <select
            name="projectId"
            value={deliveryNote.projectId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar Proyecto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Formato
          </label>
          <select
            name="format"
            value={deliveryNote.format}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="material">Material</option>
            <option value="hours">Horas</option>
          </select>
        </div>
        {deliveryNote.format === "material" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Material
            </label>
            <input
              type="text"
              name="material"
              value={deliveryNote.material}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        {deliveryNote.format === "hours" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Horas
            </label>
            <input
              type="number"
              name="hours"
              value={deliveryNote.hours}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Trabajo
          </label>
          <input
            type="date"
            name="workdate"
            value={deliveryNote.workdate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={deliveryNote.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        title="¡Albarán creado con éxito!"
        content="El albarán se ha agregado correctamente."
        icon="check"
        buttons={[
          {
            label: "Cerrar",
            onClick: handleModalClose,
            className:
              "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600",
          },
        ]}
      />
    </div>
  );
}

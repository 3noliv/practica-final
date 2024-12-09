"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "../../../components/Modal";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const initialValues = {
    name: "",
    projectCode: "",
    clientId: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre del proyecto es obligatorio"),
    projectCode: Yup.string().required("El código del proyecto es obligatorio"),
    clientId: Yup.string().required("Seleccionar un cliente es obligatorio"),
    address: Yup.object({
      street: Yup.string().required("La calle es obligatoria"),
      number: Yup.string().required("El número es obligatorio"),
      postal: Yup.string().required("El código postal es obligatorio"),
      city: Yup.string().required("La ciudad es obligatoria"),
      province: Yup.string().required("La provincia es obligatoria"),
    }),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setStatus("No se encontró el token de sesión. Por favor, inicia sesión.");
      return;
    }

    try {
      await axios.post("https://bildy-rpmaya.koyeb.app/api/project", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(true); // Mostrar modal tras guardar
      resetForm(); // Limpiar formulario
    } catch (error) {
      console.error(
        "Error al agregar el proyecto:",
        error.response?.data || error.message
      );
      setStatus("Error al agregar el proyecto. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/projects"); // Redirigir a la lista de proyectos al cerrar el modal
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Proyecto</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre del Proyecto
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectCode"
                className="block text-sm font-medium text-gray-700"
              >
                Código del Proyecto
              </label>
              <Field
                type="text"
                id="projectCode"
                name="projectCode"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="projectCode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientId"
                className="block text-sm font-medium text-gray-700"
              >
                Cliente
              </label>
              <Field
                as="select"
                id="clientId"
                name="clientId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Seleccionar Cliente</option>
                {/* Aquí deberías mapear los clientes */}
              </Field>
              <ErrorMessage
                name="clientId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calle
                </label>
                <Field
                  type="text"
                  id="street"
                  name="address.street"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="address.street"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número
                </label>
                <Field
                  type="text"
                  id="number"
                  name="address.number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="address.number"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="postal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código Postal
                </label>
                <Field
                  type="text"
                  id="postal"
                  name="address.postal"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="address.postal"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ciudad
                </label>
                <Field
                  type="text"
                  id="city"
                  name="address.city"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="address.city"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700"
                >
                  Provincia
                </label>
                <Field
                  type="text"
                  id="province"
                  name="address.province"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="address.province"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
            {status && (
              <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
            )}
          </Form>
        )}
      </Formik>
      <Modal
        isOpen={isModalOpen}
        text="El proyecto ha sido creado con éxito"
        buttonText="Volver a Proyectos"
        onClose={handleModalClose}
      />
    </div>
  );
}

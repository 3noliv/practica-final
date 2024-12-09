"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "../../../components/Modal";
import { useRouter } from "next/navigation";

export default function AddClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const initialValues = {
    name: "",
    cif: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    cif: Yup.string()
      .min(8, "El CIF debe tener al menos 8 caracteres")
      .required("El CIF es obligatorio"),
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
      await axios.post("https://bildy-rpmaya.koyeb.app/api/client", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(true); // Abrir el modal tras guardar
      resetForm(); // Limpiar el formulario
    } catch (error) {
      console.error(
        "Error al agregar el cliente:",
        error.response?.data || error.message
      );
      setStatus("Error al agregar el cliente. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/clients"); // Redirigir a la lista de clientes al cerrar el modal
  };

  const handleRedirect = () => {
    setIsModalOpen(false);
    router.push("/projects"); // Redirigir a proyectos si el usuario quiere asociar
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Agregar Cliente</h1>
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
                Nombre del Cliente o Empresa
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
                htmlFor="cif"
                className="block text-sm font-medium text-gray-700"
              >
                CIF
              </label>
              <Field
                type="text"
                id="cif"
                name="cif"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="cif"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
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
            <div className="grid grid-cols-3 gap-4 mb-4">
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
            </div>
            <div className="mb-4">
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
        title="Cliente creado con éxito"
        content="¿Quieres asociar un proyecto a este cliente?"
        buttons={[
          { label: "Sí, vamos", onClick: handleRedirect },
          {
            label: "Cerrar",
            onClick: handleModalClose,
            className: "bg-gray-500 text-white px-4 py-2 rounded",
          },
        ]}
      />
    </div>
  );
}

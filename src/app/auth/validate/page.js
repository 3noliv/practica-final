"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Validate() {
  const router = useRouter();

  const initialValues = { email: "", code: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    code: Yup.string().required("El código es obligatorio"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const token = localStorage.getItem("jwt"); // Leer el token del registro
      const response = await axios.put(
        "https://bildy-rpmaya.koyeb.app/api/user/validation",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("jwt", response.data.token); // Actualizar el token con el validado
      setStatus("Cuenta validada exitosamente.");
      router.push("/auth/login");
    } catch (error) {
      setStatus("Error al validar. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Validar Cuenta</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Código de Validación
              </label>
              <Field
                type="text"
                id="code"
                name="code"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="code"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Validando..." : "Validar"}
            </button>
            {status && <p className="mt-4 text-center text-sm">{status}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

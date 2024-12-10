"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // Usar el contexto de autenticación

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      console.log("Datos enviados para iniciar sesión:", values); // Datos enviados al backend

      const response = await axios.post(
        "https://bildy-rpmaya.koyeb.app/api/user/login",
        values
      );

      console.log("Respuesta del backend al iniciar sesión:", response.data); // Respuesta del backend

      const token = response.data.token;
      localStorage.setItem("jwt", token); // Guardar el token
      login({ name: values.email }); // Actualizar el contexto con el usuario autenticado
      setStatus("Sesión iniciada correctamente.");
      router.push("/"); // Redirigir al inicio
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data || error.message
      );

      if (error.response?.data?.errors?.[0]?.msg === "USER_NOT_VALIDATED") {
        setStatus("Usuario no validado. Por favor, verifica tu correo.");
      } else {
        setStatus("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
            </button>
            {status && (
              <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
            )}
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-center text-sm">
        ¿No tienes cuenta?{" "}
        <Link href="/auth/register" className="text-blue-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

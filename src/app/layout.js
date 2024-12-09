import "./globals.css";
import Nav from "../components/Nav";
import { AuthProvider } from "../context/AuthContext";
import ClientRedirect from "../components/ClientRedirect";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>MyApp</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 text-gray-900 flex">
        <AuthProvider>
          <Nav />
          <ClientRedirect /> {/* Redirección basada en los clientes */}
          <main className="flex-1 p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

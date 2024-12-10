import "./globals.css";
import Nav from "../components/Nav";
import { AuthProvider } from "../context/AuthContext";
import ClientRedirect from "../components/ClientRedirect";
import DynamicTitle from "../components/DynamicTitle";
import PageTransition from "../components/PageTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 text-gray-900 flex">
        <AuthProvider>
          <Nav />
          <DynamicTitle />
          <ClientRedirect />
          <main className="flex-1 p-6">
            <PageTransition>{children}</PageTransition>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

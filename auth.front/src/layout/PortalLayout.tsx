import { Link, useLocation } from "react-router-dom";
import React, { MouseEvent, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface PortalLayoutProps {
  children?: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();
  const location = useLocation(); // Para obtener la ruta actual
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar errores

  // Función para manejar el cierre de sesión
  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();
    setIsLoading(true); // Activar el estado de carga
    setError(""); // Limpiar errores anteriores

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.signout(); // Cerrar sesión en el contexto de autenticación
      } else {
        setError("Error al cerrar sesión. Inténtelo de nuevo."); // Mostrar error
      }
    } catch (error) {
      console.error(error);
      setError("Error de conexión. Inténtelo de nuevo más tarde."); // Mostrar error
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
          </div>
          <div className="nav-right">
            <ul className="nav-list">
              <li>
                <Link
                  to="/dashboard"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/me"
                  className={location.pathname === "/me" ? "active" : ""}
                >
                  Agenda una cita
                </Link>
              </li>
              <li>
                <span className="username">
                  {auth.getUser()?.username ?? "Usuario"}
                </span>
              </li>
              <li>
                <a href="#" onClick={handleSignOut} className="signout-link">
                  {isLoading ? (
                    <span className="spinner"></span> // Spinner simple
                  ) : (
                    "Cerrar Sesion"
                  )}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {error && <div className="error-message">{error}</div>} {/* Mostrar errores */}
      </header>

      <main className="main-content">{children}</main>
    </>
  );
}
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { AuthResponse, AuthResponseError } from "../types/types";
import "../Styles/Login.css";

import Imagen from "../assets/Dr Simi Sticker.gif";
import ImageProfile from "../assets/fotodeperfil.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
      setErrorResponse("Error al conectar con el servidor.");
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <DefaultLayout>
            <form onSubmit={handleSubmit} className="form">
              <h1>Login</h1>
              <img src={ImageProfile} alt="Profile" className="profile-image" />
              {!!errorResponse && (
                <div className="error-message">{errorResponse}</div>
              )}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  value={username}
                  placeholder="Enter your username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={password}
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <p style={{ textAlign: "center", marginTop: "15px" }}>
                ¿No tienes cuenta?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Regístrate aquí
                </Link>
              </p>
            </form>
          </DefaultLayout>
        </div>

        <div className="login-image">
          <img src={Imagen} alt="Background" className="background-image" />
        </div>
      </div>
    </div>
  );
}

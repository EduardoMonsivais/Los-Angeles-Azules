import React, { useState } from "react";
import { Link } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import emailjs from "emailjs-com"; // Importar EmailJS
import {  } from "../Styles/Profile.css";

export default function Profile() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    motivoConsulta: "",
    direccion: "",
    correo: "",
  });

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para enviar el correo con EmailJS
  const enviarDatos = async (e: React.FormEvent) => {
    e.preventDefault();

    // Configuración de EmailJS (reemplazar con tu configuración real)
    const serviceID = "service_rt21zpm"; // Tu Service ID
    const templateID = "template_qrlqz2c"; // Tu Template ID
    const userID = "cGXhldft8GX4qOBGL"; // Tu User ID

    try {
      // Enviar el correo
      await emailjs.send(serviceID, templateID, formData, userID);
      alert("Correo enviado correctamente");

      // Limpiar el formulario después de enviar
      setFormData({
        nombre: "",
        telefono: "",
        motivoConsulta: "",
        direccion: "",
        correo: "",
      });
    } catch (error) {
      console.error("Error enviando el correo:", error);
      alert("Error al enviar el correo");
    }
  };

  return (
    <PortalLayout>
      <div className="formulario-container">
        <h1>Formulario de Contacto</h1>
        <form onSubmit={enviarDatos} className="formulario">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivoConsulta">Motivo de Consulta:</label>
            <textarea
              id="motivoConsulta"
              name="motivoConsulta"
              value={formData.motivoConsulta}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>
        <Link to="/" className="volver-link">
          Volver a Home
        </Link>
      </div>
    </PortalLayout>
  );
}

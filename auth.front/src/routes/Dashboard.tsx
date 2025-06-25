import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import {  } from "../Styles/Estiloshome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';





interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  async function getTodos() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTodo() {
    if (value.length > 3) {
      try {
        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ title: value }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
  }

  return (
    <PortalLayout>
    <div className="body">
      {/* Encabezado personalizado */}
      <header className="header">
        <h1 className="bnv">Bienvenido, {auth.getUser()?.name ?? "Usuario"}</h1>
        <p className="subtitulo">Tu salud es nuestra prioridad</p>
      </header>

     {/* Sección sobre nosotros */}
<section className="contenedor sobre-nosotros">
  <h2 className="titulo">Nuestra Sucursal</h2>
  <div className="contenedor-sobre-nosotros">
    {/* Mapa interactivo */}
    <div className="mapa-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57530.50295166476!2d-100.56270455136719!3d25.682681300000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662988a58e9f653%3A0xf05aa5fddc3d5296!2sIMSS%20Unidad%20de%20Medicina%20Familiar%2064%20Santa%20Catarina!5e0!3m2!1ses-419!2smx!4v1738869616297!5m2!1ses-419!2smx"
        width="100%"
        height="450"
        style={{ border: '0' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    {/* Contenido descriptivo */}
    <div className="contenido-textos">
      <div className="texto-item">
        <div className="icono">🏥</div> {/* Icono de hospital */}
        <div className="texto-contenido">
          <h3>
            <span></span> - Instalaciones de primer nivel
          </h3>
          <p>
            Contamos con sala de urgencias, sala de espera y un centro de rehabilitación equipado con tecnología de vanguardia.
          </p>
        </div>
      </div>

      <div className="texto-item">
        <div className="icono">👩‍⚕️</div> {/* Icono de médico */}
        <div className="texto-contenido">
          <h3>
            <span></span> - Personal altamente calificado
          </h3>
          <p>
            Nuestro equipo está formado por especialistas y enfermeras dedicados a brindar una atención cálida y profesional.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Sección de redes sociales */}

<div className="redes-sociales">
<h2 className="titulo">Siguenos en</h2>
      <a href="https://www.facebook.com/profile.php?id=61572790568835" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} className="icono" />
      </a>
      
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} className="icono" />
      </a>
    </div>

     {/* Sección de metas */}
<section className="about-services">
  <div className="contenedor">
    <h2 className="titulo">Nuestras Metas</h2>
    <div className="servicio-cont">
      {/* Meta 1 */}
      <div className="servicio-ind">
        <div className="icono">
          <span role="img" aria-label="Estrella">⭐</span> {/* Icono de estrella */}
        </div>
        <h3>Brindar la mejor experiencia</h3>
        <p>
          Nos comprometemos a ofrecer un servicio excepcional, centrado en el bienestar y la comodidad del paciente.
        </p>
      </div>

      {/* Meta 2 */}
      <div className="servicio-ind">
        <div className="icono">
          <span role="img" aria-label="Corazón">❤️</span> {/* Icono de corazón */}
        </div>
        <h3>Salud para todos</h3>
        <p>
          Trabajamos para garantizar que toda la comunidad tenga acceso a servicios médicos de calidad, sin costo alguno.
        </p>
      </div>

      {/* Meta 3 */}
      <div className="servicio-ind">
        <div className="icono">
          <span role="img" aria-label="Estetoscopio">🩺</span> {/* Icono de estetoscopio */}
        </div>
        <h3>Formar profesionales</h3>
        <p>
          Fomentamos el crecimiento y desarrollo de nuevos talentos en el campo de la salud.
        </p>
      </div>
    </div>
  </div>
</section>


<section className="testimonios">
  <h2 className="titulo">Lo que dicen nuestros pacientes</h2>
  <div className="testimonios-grid">
    {/* Testimonio 1 */}
    <div className="testimonio">
      <p>"Excelente atención y profesionales muy capacitados. ¡Los recomiendo!"</p>
      <span>- María González</span>
    </div>

    {/* Testimonio 2 */}
    <div className="testimonio">
      <p>"Gracias a la clínica, mi recuperación fue rápida y efectiva."</p>
      <span>- Juan Pérez</span>
    </div>

    {/* Testimonio 3 */}
    <div className="testimonio">
      <p>"El personal es muy amable y las instalaciones están impecables."</p>
      <span>- Laura Martínez</span>
    </div>

    {/* Testimonio 4 */}
    <div className="testimonio">
      <p>"Me sentí muy bien atendido desde el primer momento. ¡Gracias!"</p>
      <span>- Carlos Sánchez</span>
    </div>
  </div>
</section>


      {/* Pie de página */}
      <footer className="footer">
        <p>© 2023 Pare de Sufrir. Todos los derechos reservados.</p>
        <p>Contacto: paredesusfrir@gmail.com | Teléfono: +52 123 456 7890</p>
      </footer>
    </div>



    </PortalLayout>
  );
}
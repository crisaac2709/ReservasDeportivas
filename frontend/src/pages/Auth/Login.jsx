import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/Input/InputField";
import "./Login.css"


export const LoginUsuario = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", form);
      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      setMensaje("¡Inicio de sesión exitoso!");
      setIsError(false);
      
      // Redirección a Inicio
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)
      
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al iniciar sesión");
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        
        <div className="input-group">
          <InputField
            label={"Correo Electronico"}
            type={"email"}
            id="email"
            name={"email"}
            className="login-input"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-group">
          <InputField
            type={"password"}
            id="password"
            name={"password"}
            className="login-input"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="login-btn">
          Iniciar Sesión
        </button>
        
        {mensaje && (
          <div className={`message ${isError ? 'error-message' : 'success-message'}`}>
            {mensaje}
          </div>
        )}
        
        {usuario && (
          <div className="welcome-message">
            Bienvenido {usuario.nombres} ({usuario.rol})
          </div>
        )}
        
        <div className="login-links">
          <a href="/registrar-usuario">¿No tienes cuenta? Regístrate</a>
          <br />
          {/*<a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>*/}
        </div>
      </form>
    </div>
  );
};
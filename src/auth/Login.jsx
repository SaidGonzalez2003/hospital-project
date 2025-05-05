import React, { useState } from "react";
import "../css/login.css";
import { loginForm } from "../js/consultas";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    usuario: "",
    pass: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.usuario || !formData.pass) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const result = await loginForm(formData.usuario, formData.pass);
        
      if (result === 401) {
        setError("Usuario o contraseña incorrectos");
        return
      } else if(result === 500) {
        setError("Sitio no disponible en su red");
        return
      }
      login(result.token);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <section className="login_container">
      <article className="login_form">
        <div
          className={
            (error.length === 0 ? "" : " mostrar_msg ") + "login_error"
          }
        >
          <p> {error} </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login_form_logo">
            <img src="../src/logoLogin.png" alt="Login" />
          </div>
          <label>Iniciar Sesión</label>

          <div className="login_campos">
            <img src="../src/user.png" alt="" />
            <input
              type="text"
              placeholder="Ingrese su Usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login_campos">
            <img src="../src/pass.png" alt="" />
            <input
              type="password"
              placeholder="Ingrese su Contraseña"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login_iniciar" type="submit">
            Ingresar
          </button>

          <p>Si no tiene una cuenta contacte a su administrador.</p>
        </form>
      </article>

      <article className="login_img">
        <img src="../src/fondoLogin.jpg" alt="" />
      </article>
    </section>
  );
};
export default Login;

import React from "react";
import "../css/login.css";

const Login = () => {
  return (
    <section className="login_container">
      <article className="login_form">
        <form>
          <div className="login_form_logo">
            <img src="../src/logoLogin.png" alt="Login" />
          </div>
          <label>Iniciar Sesión</label>

          <div className="login_campos">
            <img src="../src/user.png" alt="" />
            <input type="text" placeholder="Ingrese su Usuario" />
          </div>

          <div className="login_campos">
          <img src="../src/pass.png" alt="" />
            <input type="password" placeholder="Ingrese su Contraseña" />
          </div>

          <button className="login_iniciar">Ingresar</button>

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

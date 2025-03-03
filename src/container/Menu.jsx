import React, { useState } from "react";
import "../css/dashboard_menu.css";

const Menu = ({ menuAllDash }) => {
  const [page, setPage] = useState(0);

  return (
    <div className="dash_contain">
      <div className="dash_item">
        <div className="dash_title_img">
          <img src="../src/logo.png" alt="logo" />
        </div>

        <h2
          className={
            menuAllDash ? "dashboard_texts_active" : "dashboard_texts_desactive"
          }
        >
          Policlinica
        </h2>
      </div>

      <div className="menu_divider"></div>

      <div
        className="dash_item "
        onClick={() => {
          setPage(0);
        }}
      >
        <div
          className={
            page == 0
              ? "item_selected dashboard_texts_active"
              : "dashboard_texts_desactive"
          }
        ></div>

        <div className="dash_title_img">
          <img src="../src/analisis.png" alt="logo" />
        </div>

        <h3
          className={
            menuAllDash ? "dashboard_texts_active" : "dashboard_texts_desactive"
          }
        >
          Control de Calidad
        </h3>
      </div>

      <div
        className="dash_item dash_item_margin"
        onClick={() => {
          setPage(1);
        }}
      >
        <div
          className={
            page == 1
              ? "item_selected  dashboard_texts_active"
              : "dashboard_texts_desactive"
          }
        ></div>

        <div className="dash_title_img">
          <img src="../src/calculo.png" alt="logo" />
        </div>

        <h3
          className={
            menuAllDash ? "dashboard_texts_active" : "dashboard_texts_desactive"
          }
        >
          Calculos
        </h3>
      </div>

      <div
        className="dash_item dash_item_margin"
        onClick={() => {
          setPage(2);
        }}
      >
        <div
          className={
            page == 2
              ? "item_selected  dashboard_texts_active"
              : "dashboard_texts_desactive"
          }
        ></div>

        <div className="dash_title_img">
          <img src="../src/paciente.png" alt="logo" />
        </div>

        <h3
          className={
            menuAllDash ? "dashboard_texts_active" : "dashboard_texts_desactive"
          }
        >
          Pacientes
        </h3>
      </div>

      <div
        className="dash_item dash_item_margin"
        onClick={() => {
          setPage(3);
        }}
      >
        <div
          className={
            page == 3
              ? "item_selected  dashboard_texts_active"
              : "dashboard_texts_desactive"
          }
        ></div>

        <div className="dash_title_img">
          <img src="../src/info.png" alt="logo" />
        </div>

        <h3
          className={
            menuAllDash ? "dashboard_texts_active" : "dashboard_texts_desactive"
          }
        >
          Información
        </h3>
      </div>
    </div>
  );
};

export default Menu;

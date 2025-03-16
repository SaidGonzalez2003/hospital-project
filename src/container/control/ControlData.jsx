import React from "react";
import "../../css/controlPage.css";
import "../../js/consultas.js";
import ReactECharts from "echarts-for-react";
import { deleteRegistroById, formatDate } from "../../js/consultas.js";
import { ControlGrafico } from "../../js/funciones.js";

const ControlData = ({ registros, setRegistros }) => {
  const handleDeleteRegistro = (id) => {
    try {
      deleteRegistroById(id);

      const nuevosRegistros = registros.filter(
        (registro) => registro.id !== id
      );
      setRegistros(nuevosRegistros);

      console.log("Elimnado registro: " + id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <article className="control_data_table">
        <div className="control_data_lote">
          <p>Lote</p>
          <p>{registros[0].id_lote} </p>
        </div>
        <table className="control_table_data">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Valor</th>
              <th>Z</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {registros.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.fecha)}</td>
                <td>{item.valor}</td>
                <td>{item.valor_z}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRegistro(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <article className="control_data_grapics">
        {registros.length > 7 ? (
          <ReactECharts
            option={ControlGrafico(registros)}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <div className="control_low_data">
            <video
              autoPlay
              disablePictureInPicture
              controlsList="nodownload noremoteplayback"
            >
              <source src="../src/Grafica.webm" type="video/webm"></source>
            </video>

            <p>Muy Pocos Datos para Analizar</p>
          </div>
        )}
      </article>
    </>
  );
};

export default ControlData;

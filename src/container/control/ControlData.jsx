import React from "react";
import "../../css/controlPage.css";
import "../../js/consultas.js";
import ReactECharts from "echarts-for-react";
import { deleteRegistroById, formatDate } from "../../js/consultas.js";
import { ControlGrafico } from "../../js/funciones.js";

const ControlData = ({
  registros,
  setRegistros,
  allLotes,
  lastLote,
  setLastLote,
}) => {
  const handleDeleteRegistro = (id) => {
    try {
      deleteRegistroById(id);

      const nuevosRegistros = registros.filter(
        (registro) => registro.id !== id
      );
      setRegistros(nuevosRegistros);
    } catch (error) {
      console.log(error);
    }
  };

  const getLote = (e) => {
    setLastLote(e.target.value);
  };

  return (
    <>
      <article className="control_data_table">
        <div className="control_data_lote">
          <div className="control_table_search">
            {lastLote ? (
              <form className="control_select_lote">
                <label>Seleccionar Lote: </label>
                <select
                  name="id_lote"
                  value={lastLote}
                  onChange={getLote}
                  title="Buscar Lote"
                >
                  {allLotes.map((lote, index) => (
                    <option key={index} value={lote.Id}>
                      {lote.Id}
                    </option>
                  ))}
                </select>
              </form>
            ) : (
              <div>Cargando...</div>
            )}
          </div>
        </div>

        {Array.isArray(registros) && registros.length > 0 ? (
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
        ) : (
          <div>Cargando...</div>
        )}
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

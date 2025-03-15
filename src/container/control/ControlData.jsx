import React from "react";
import "../../css/controlPage.css";
import "../../js/consultas.js";
import { deleteRegistroById, formatDate } from "../../js/consultas.js";

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

      <article className="control_data_grapics"></article>
    </>
  );
};

export default ControlData;

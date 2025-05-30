import React from "react";
import { useState, useEffect, useRef } from "react";
import ControlData from "./ControlData";
import {
  addRegistros,
  getAllLotes,
  getEnsayos,
  getLoteLastValue,
  getRegistrosByLoteEnsayo,
} from "../../js/consultas.js";
import {
  calcularCV,
  calcularDesviacionEstandar,
  calcularMedia,
  fechaActual,
} from "../../js/funciones.js";
import ControlPdf from "../pdf/ControlPdf.jsx";
("../../css/controlPage.css");
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ControlPageOne = () => {
  const [controlOpc, setControlOpc] = useState(1);
  const [lastLote, setLastLote] = useState(0);
  const [registros, setRegistros] = useState([]);
  const [ensayos, setEnsayos] = useState([]);
  const [ocultar, setOcultar] = useState(false);
  const [allLotes, setAllLotes] = useState();
  const [animatePDF, setAnimatePDF] = useState();
  const [agregarRegistro, setAgregarRegistro] = useState(false);
  const [errorRegistro, setErrorRegistro] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    valor: "",
    valor_z: "",
    id_lote: "",
    id_ensayo: "",
  });

  const reportRef = useRef();

  //obtener los registros del lote mas Reciente
  useEffect(() => {
    const fetchData = async () => {
      const resultLote = await getLoteLastValue();
      setLastLote(resultLote);
    };

    fetchData();
  }, []);

  //Registros
  useEffect(() => {
    const fetchData = async () => {
      setFormData({
        ...formData,
        id_lote: lastLote,
        id_ensayo: controlOpc,
      });

      const resultAllLotes = await getAllLotes();
      setAllLotes(resultAllLotes);

      if (Array.isArray(ensayos) && ensayos.length > 0) {
        const resultRegistros = await getRegistrosByLoteEnsayo(
          lastLote,
          controlOpc
        ); // Verifica que `result` sea el JSON esperado
        setRegistros(resultRegistros);
      }

      //Obtener registros
      // Accede a la propiedad 'registros' del JSON
    };

    fetchData(); // Llamar a la función asincrónica
  }, [controlOpc, ensayos]);

  //buscar un nuevo Lote
  useEffect(() => {
    const fetchData = async () => {
      if (Array.isArray(ensayos) && ensayos.length > 0) {
        const resultRegistros = await getRegistrosByLoteEnsayo(
          lastLote,
          controlOpc
        ); // Verifica que `result` sea el JSON esperado
        setRegistros(resultRegistros);
      }
    };

    fetchData();
  }, [lastLote]);

  useEffect(() => {
    setTimeout(() => {
      if (animatePDF) {
        setAnimatePDF(false);
      }
    }, 4500);
  }, [animatePDF]);

  //GetEnsayos
  useEffect(() => {
    const fetchData = async () => {
      const result = await getEnsayos(); // Verifica que `result` sea el JSON esperado
      setEnsayos(result); // Accede a la propiedad 'registros' del JSON
    };

    fetchData(); // Llamar a la función asincrónica
  }, []);

  //Animacion Agregar Dato
  useEffect(() => {
    setTimeout(() => {
      setOcultar(agregarRegistro);
    }, 250);
  }, [agregarRegistro]);

  //Agregar Datos de los registros
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Enviar los datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await addRegistros(formData);

      if (result.data) {
        setFormData({
          fecha: "",
          valor: "",
          valor_z: "",
          id_lote: formData.id_lote,
          id_ensayo: controlOpc,
        });

        const resultRegistros = await getRegistrosByLoteEnsayo(
          lastLote,
          controlOpc
        ); // Verifica que `result` sea el JSON esperado
        setRegistros(resultRegistros);

        setAgregarRegistro(false);
        setErrorRegistro(false);
      } else {
        setErrorRegistro(true);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  //Generar PDF
  const generarPDF = async () => {
    const element = reportRef.current;

    const canvas = await html2canvas(element, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg");

    // Creamos el PDF (por ejemplo, tamaño Carta en portrait)
    const pdf = new jsPDF("l", "mm", "letter");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Obtenemos las propiedades de la imagen para mantener la relación de aspecto
    const imgProps = pdf.getImageProperties(imgData);
    const pdfImgWidth = pageWidth; // La imagen ocupará todo el ancho de la página
    const pdfImgHeight = (imgProps.height * pdfImgWidth) / imgProps.width;

    let position = 0; // Posición vertical inicial
    pdf.addImage(imgData, "JPEG", 0, position, pdfImgWidth, pdfImgHeight);

    // Si la imagen es más alta que una página, agregamos nuevas páginas
    let heightLeft = pdfImgHeight - pageHeight;
    while (heightLeft > 0) {
      pdf.addPage();
      // Calculamos la posición para el fragmento de la imagen que corresponde a la nueva página
      position = heightLeft - pdfImgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, pdfImgWidth, pdfImgHeight);
      heightLeft -= pageHeight;
    }

    // 8. Guardar el PDF
    pdf.save(
      "Reporte " + ensayos[controlOpc - 1].titulo + " " + fechaActual() + ".pdf"
    );
  };

  return (
    <div className="control_page_one">
      <div className="page_one_options">
        <div className="control_options_container">
          {Array.isArray(ensayos) && ensayos.length > 0 ? (
            <ul className="contrel_options_nav">
              {ensayos.map((ensayo, index) => (
                <li
                  key={index}
                  className={
                    controlOpc == ensayo.Id ? "control_opc_select" : ""
                  }
                  onClick={() => setControlOpc(ensayo.Id)}
                >
                  {ensayo.titulo}{" "}
                </li>
              ))}
            </ul>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>

      <div className="control_data_metricas">
        <article className="metricas_data">
          <div className="metricas_data_text">
            <div className="metricas_data_img">
              <img src="../src/media.png" alt="" />
            </div>
            <p>Media</p>
          </div>

          {Array.isArray(registros) && registros.length > 0 ? (
            <p>{calcularMedia(registros)}</p>
          ) : (
            <p>Cargando...</p>
          )}
        </article>

        <article className="metricas_data">
          <div className="metricas_data_text">
            <div className="metricas_data_img">
              <img src="../src/media.png" alt="" />
            </div>
            <p>Desviación</p>
          </div>

          {Array.isArray(registros) && registros.length > 0 ? (
            <p>{calcularDesviacionEstandar(registros)}</p>
          ) : (
            <p>Cargando...</p>
          )}
        </article>

        <article className="metricas_data">
          <div className="metricas_data_text">
            <div className="metricas_data_img">
              <img src="../src/media.png" alt="" />
            </div>
            <p>CV</p>
          </div>

          {Array.isArray(registros) && registros.length > 0 ? (
            <p>{calcularCV(registros)}</p>
          ) : (
            <p>Cargando...</p>
          )}
        </article>
      </div>

      <div className="control_data_container">
        {Array.isArray(allLotes) && allLotes.length > 0 ? (
          <ControlData
            registros={registros}
            setRegistros={setRegistros}
            setAgregarRegistro={setAgregarRegistro}
            setOcultar={setOcultar}
            allLotes={allLotes}
            lastLote={lastLote}
            setLastLote={setLastLote}
          />
        ) : (
          <div></div>
        )}
      </div>

      <div
        className={
          (agregarRegistro ? "" : "ocultar_add ") +
          (agregarRegistro ? "" : ocultar ? " " : "mandar_fondo ") +
          " control_add_registro "
        }
      >
        <article className="add_registro_container">
          {Array.isArray(ensayos) && ensayos.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <div className="add_resgistro_data">
                <legend>
                  {" "}
                  Agregar datos de <b>{ensayos[controlOpc - 1].titulo}</b>{" "}
                </legend>

                <div
                  className={
                    (errorRegistro ? "" : "ocultar_msg") +
                    " control_error_data_msg"
                  }
                >
                  <p>Ingrese los datos correctamente</p>
                </div>

                <div className="control_form_inputs">
                  <label>Fecha:</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                  />
                </div>

                <div className="control_form_inputs">
                  <label>Valor:</label>
                  <input
                    type="number"
                    step="any"
                    max="10"
                    min="0"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                  />
                </div>

                <div className="control_form_inputs">
                  <label>Valor Z:</label>
                  <input
                    type="number"
                    step="any"
                    max="10"
                    min="0"
                    name="valor_z"
                    value={formData.valor_z}
                    onChange={handleChange}
                  />
                </div>

                {Array.isArray(allLotes) && allLotes.length > 0 ? (
                  <div className="control_form_inputs">
                    <label>Lote: </label>
                    <select
                      name="id_lote"
                      value={formData.id_lote}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar Lote </option>
                      {allLotes.map((lote, index) => (
                        <option key={index} value={lote.Id}>
                          {lote.Id}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>Cargando...</div>
                )}
              </div>

              <div className="add_registro_btns">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setAgregarRegistro(false);
                    setErrorRegistro(false);
                  }}
                >
                  Cerrar
                </button>
                <button type="submit">Agregar</button>
              </div>
            </form>
          ) : (
            <div>cargando</div>
          )}
        </article>
      </div>

      <div className="control_btn_add_container ">
        <div
          className="control_btn_add_register"
          onClick={() => {
            setAgregarRegistro(true);
          }}
        >
          <p>+</p>
        </div>

        {Array.isArray(registros) && registros.length > 8 ? (
          <div
            className="control_btn_PDF"
            onClick={() => {
              generarPDF();
              setAnimatePDF(true);
            }}
          >
            <p>P</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className={(animatePDF ? "move_animated_pdf" : "") + " control_pdf"}>
        {Array.isArray(registros) && registros.length > 0 && (
          <ControlPdf
            reportRef={reportRef}
            registros={registros}
            ensayos={ensayos}
            controlOpc={controlOpc}
          />
        )}
      </div>
    </div>
  );
};

export default ControlPageOne;

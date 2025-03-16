import React from "react";

import("../../css/pdfReport.css");
import {
  calcularCV,
  calcularDesviacionEstandar,
  calcularMedia,
  ControlGrafico,
  ControlGraficoImpresión,
  fechaActual,
  getFecha,
} from "../../js/funciones.js";
import ReactECharts from "echarts-for-react";

const ControlPdf = ({ reportRef, registros, ensayos, controlOpc }) => {
  return (
    <div ref={reportRef} className="control_PDF_Container">
      <div className="control_PDF_info">
        <div className="control_PDF_titulo">
          <p>
            <b>Lote: </b> {registros[0].id_lote}{" "}
          </p>
        </div>

        <div className="control_PDF_titulo">
          <p>
            <b>Ensayo: </b> {ensayos[controlOpc - 1].titulo}{" "}
          </p>
        </div>

        <div className="control_PDF_titulo">
          <p>
            <b>Fecha: </b> {fechaActual()}{" "}
          </p>
        </div>
      </div>

      <div className="control_PDF_Metricas">
        <article className="control_pdf_metricas_container">
          <div className="control_pdf_metricas_titulo">
            <div className="control_pdf_metrica_img">
              <img src="../src/media.png" alt="" />
            </div>
            <p>Media</p>
          </div>

          <p className="control_pdf_metricas_text">
            {calcularMedia(registros)}
          </p>
        </article>

        <article className="control_pdf_metricas_container">
          <div className="control_pdf_metricas_titulo">
            <div className="control_pdf_metrica_img">
              <img src="../src/media.png" alt="" />
            </div>
            <p>Desviación</p>
          </div>

          <p className="control_pdf_metricas_text">
            {calcularDesviacionEstandar(registros)}
          </p>
        </article>

        <article className="control_pdf_metricas_container">
          <div className="control_pdf_metricas_titulo">
            <div className="control_pdf_metrica_img">
              <img src="../src/media.png" alt="" />
            </div>
            <p>CV</p>
          </div>

          <p className="control_pdf_metricas_text">{calcularCV(registros)}</p>
        </article>
      </div>

      <article className="control_PDF_grafico">
        {registros.length > 7 ? (
          <ReactECharts
            option={ControlGraficoImpresión(registros)}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <div className="control_low_data">
            <p>Muy Pocos Datos para Analizar</p>
          </div>
        )}
      </article>

      <div className="control_pdf_intervalo">
        <p>
          <b>Fecha de Apertura: </b>{" "}
          {getFecha(registros[registros.length - 1].fecha)}{" "}
        </p>
        <p>
          <b>Fecha de Cierre: </b> {getFecha(registros[0].fecha)}{" "}
        </p>
      </div>
    </div>
  );
};

export default ControlPdf;

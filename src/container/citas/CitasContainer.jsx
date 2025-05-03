import React, { useEffect, useState } from "react";
import "../../css/citas.css";
import { getFecha, getToDay } from "../../js/funciones";
import {
  addCita,
  getCitasFirst,
  getHorasDisponibles,
} from "../../js/consultas";

const CitasContainer = () => {
  // 0 Sin Agregar - 1 Error - 2 Agregado
  const [agregado, setAgregado] = useState(0);
  const tiposSangre = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [genero, setGenero] = useState(0);
  const [citas, setCitas] = useState();
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    curp: "",
    fecha: getToDay(),
    genero: genero,
    tipo: tiposSangre[0] || "",
    informacion: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const horas = await getHorasDisponibles(getToDay()); // Esperamos a que la promesa se resuelva
        setHorasDisponibles(horas);

        setCitas(await getCitasFirst());

        setFormData({
          ...formData,
          hora: horas[0],
        });
      } catch (error) {
        console.error("Error al obtener las horas disponibles:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addCita(formData);

    if (result == false) {
      setAgregado(1);

      setTimeout(() => {
        setAgregado(0);
      }, 4000);

      return;
    }

    setAgregado(2);

    const horas = await getHorasDisponibles(getToDay());

    setHorasDisponibles(horas);

    setFormData({
      nombre: "",
      apellidos: "",
      curp: "",
      fecha: getToDay(),
      genero: 0,
      hora: horas[0],
      tipo: tiposSangre[0],
      informacion: "",
    });

    setGenero(0);

    setCitas(await getCitasFirst());

    setTimeout(() => {
      setAgregado(0);
    }, 4000);
  };

  return (
    <section className="citas_container">
      <article className="citas_asignar_container">
        <h2>Agendar Cita</h2>

        <form className="citas_form" onSubmit={handleSubmit}>
          {agregado !== 0 ? (
            <div
              className={
                "citas_mensaje " + (agregado === 1 ? "cita_msg_r" : "")
              }
            >
              {agregado === 1 ? (
                <p>Datos Incorrectos Verificalos</p>
              ) : (
                <p>Agregado Correctamente</p>
              )}
            </div>
          ) : (
            ""
          )}

          <div>
            <label>Nombre(s)</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Curp</label>
            <input
              type="text"
              name="curp"
              minLength="18"
              value={formData.curp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="citas_fecha_hora">
            <div className="citas_form_fecha">
              <label>Fecha</label>
              <input
                required
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={async (event) => {
                  const newFecha = event.target.value;

                  // Actualizamos el estado de formData y horasDisponibles en una sola llamada
                  const horas = await getHorasDisponibles(newFecha);

                  // Actualizamos ambos estados juntos
                  setFormData({
                    ...formData,
                    fecha: newFecha, // Actualiza la fecha
                    hora: horas[0], // Establece la primera hora disponible
                  });

                  // Actualizamos las horas disponibles
                  setHorasDisponibles(horas);
                }}
                min={getToDay()} // Asegura que el usuario no seleccione fechas pasadas
              />
            </div>

            <div className="citas_form_hora">
              <label>Hora</label>

              {Array.isArray(horasDisponibles) &&
              horasDisponibles.length > 0 ? (
                <select
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Selecciona una hora
                  </option>
                  {horasDisponibles.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              ) : (
                <div>Sin horas disponibles para esta fecha</div>
              )}
            </div>
          </div>

          <div className="citas_data_paciente">
            <div className="citas_form_data_inputs citas_width_genero">
              <label>Sexo</label>
              <div className="citas_form_genero">
                <article
                  className={genero == 0 ? "genero_background" : ""}
                  onClick={() => {
                    setGenero(0);
                    setFormData({
                      ...formData,
                      genero: 0,
                    });
                  }}
                >
                  <img src="../src/hombre.png" alt="hombre" />
                </article>

                <article
                  className={genero == 1 ? "genero_background" : ""}
                  onClick={() => {
                    setGenero(1);
                    setFormData({
                      ...formData,
                      genero: 1,
                    });
                  }}
                >
                  <img src="../src/mujer.png" alt="mujer" />
                </article>
              </div>
            </div>

            <div className="citas_form_data_inputs citas_width_tipo">
              <label>Tipo de Sangre</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                {tiposSangre.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>Agregar Información Adicional</label>
            <textarea
              rows="4"
              name="informacion"
              value={formData.informacion}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className="enviar_cita">Agregar Cita</button>
          </div>
        </form>
      </article>

      <article className="scheduled_container">
        <h2>Proximas Citas</h2>

        {Array.isArray(citas) && citas.length > 0 ? (
          citas.map((data, index) => {
            return (
              <div className="scheduled_visualize" key={index}>
                <article className="card_cita">
                  <div className="card_citas_genero">
                    {data.genero === 0 ? (
                      <img src="../src/hombre.png" alt="" />
                    ) : (
                      <img src="../src/mujer.png" alt="" />
                    )}
                  </div>

                  <div className="card_citas_data">
                    <p>
                      <b>Nombre Completo:</b> {data.nombre} {data.apellidos}
                    </p>
                    <p>
                      <b>CURP:</b> {data.curp}
                    </p>
                    <p>
                      <b>Fecha y Hora:</b> {getFecha(data.fecha)} {data.hora}
                    </p>
                    <p>
                      <b>Información:</b> {data.informacion}
                    </p>
                  </div>

                  <div className="card_citas_tipo">
                    <p>
                      <b>Tipo de Sangre</b>
                    </p>
                    <img
                      src={`/src/tipos/${data.tipo}.png`}
                      alt={`${data.tipo}`}
                    />
                  </div>
                </article>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </article>
    </section>
  );
};

export default CitasContainer;

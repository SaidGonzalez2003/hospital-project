export const calcularMedia = (registros) => {
  const valores = registros.map((item) => parseFloat(item.valor));
  const suma = valores.reduce((acc, valor) => acc + valor, 0);
  const media = suma / valores.length;
  return media.toFixed(5);
};

export const calcularDesviacionEstandar = (registros) => {
  // Primero, calculamos la media
  const mediaValor = calcularMedia(registros);

  // Sumar los cuadrados de las diferencias entre cada valor y la media
  const sumaDeCuadrados = registros.reduce(
    (acc, item) => acc + Math.pow(item.valor - mediaValor, 2), // Asegúrate de acceder a `valor` de cada objeto
    0
  );

  // Calcular la varianza
  const varianza = sumaDeCuadrados / registros.length;

  // Calcular la desviación estándar
  const desviacionEstandar = Math.sqrt(varianza);

  // Redondear a 5 decimales y devolver
  return desviacionEstandar.toFixed(5);
};

export const calcularCV = (registros) => {
  const media = calcularMedia(registros);
  const desviacionEstandar = calcularDesviacionEstandar(registros);

  const CV = (desviacionEstandar / media) * 100;

  return CV.toFixed(5);
};

export const validarFecha = (fecha) => {
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha)) {
    return false;
  }

  return true;
};

export const ControlGrafico = (data) => {
  const valores = data.map((value) => value.valor);

  const cantidades = data.map((value) => formatearFecha(value.fecha));

  const grafico = {
    title: {
      text: "Grafico Analisis de Información",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: cantidades,
      inverse: true,
      axisLabel: {
        interval: 0, // Fuerza mostrar todas las etiquetas
        rotate: 90, // (Opcional) Gira las etiquetas para que no se sobrepongan
      },
    },
    tooltip: {
      trigger: "axis",
      min: 1,
    },
    yAxis: {
      type: "value",
      min: 2,
      max: 3.2,
      interval: 0.2,
    },
    series: [
      {
        data: valores,
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#1abc9c", // Color de la línea
          // Opcional: si deseas un borde alrededor del punto, lo defines aquí
          borderColor: "#1abc9c",
          borderWidth: 1,
        },
        lineStyle: {
          color: "#1abc9c", // Aquí defines el color de la línea (rojo)
        },
      },
    ],
    animationDuration: 500,
    animationDurationUpdate: 500,
  };

  return grafico;
};

export const ControlGraficoImpresión = (data) => {
  const valores = data.map((value) => value.valor);

  const cantidades = data.map((value) => formatearFecha(value.fecha));

  console.log(cantidades.length);

  const grafico = {
    title: {
      text: "Grafico Analisis de Información",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: cantidades,
      axisLabel: {
        interval: 0, // Fuerza mostrar todas las etiquetas
        rotate: 45, // (Opcional) Gira las etiquetas para que no se sobrepongan
      },
      inverse: true,
    },
    tooltip: {
      trigger: "axis",
      min: 1,
    },
    yAxis: {
      type: "value",
      min: 2,
      max: 3.2,
      interval: 0.2,
    },
    series: [
      {
        data: valores,
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        label: {
          show: true, // Habilita la visualización de la etiqueta en cada punto
          position: "center", // Posición de la etiqueta (puede ser 'top', 'inside', etc.)
          formatter: "{c}",
          rotate: 90, // Muestra el valor numérico del punto
        },
        itemStyle: {
          color: "#1abc9c", // Color de la línea
          // Opcional: si deseas un borde alrededor del punto, lo defines aquí
          borderColor: "#1abc9c",
          borderWidth: 1,
        },
        lineStyle: {
          color: "#1abc9c", // Aquí defines el color de la línea (rojo)
        },
      },
    ],
  };

  return grafico;
};

export const fechaActual = () => {
  const fechaActual = new Date();
  const dia = fechaActual.getDate().toString().padStart(2, "0");
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0
  const anio = fechaActual.getFullYear();

  // Formato: DD/MM/YYYY HH:MM:SS
  const fechaFormateada = `${dia}/${mes}/${anio} `;

  return fechaFormateada;
};

export const getFecha = (fecha) => {

  const data = new Date(fecha);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const anio = data.getFullYear().toString()
  
  // Formato: DD/MM/YYYY HH:MM:SS
  const fechaFormateada = `${dia}/${mes}/${anio} `;
  

  return fechaFormateada;
};

const formatearFecha = (fechaISO) => {
  // Arreglo con las abreviaturas de los meses
  const fecha = new Date(fechaISO);
  // Extraer el día y asegurar que tenga dos dígitos
  const dia = fecha.getDate().toString().padStart(2, "0");
  // Extraer el mes (0-indexado) y usar un arreglo de abreviaturas
  const meses = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const mesAbreviado = meses[fecha.getMonth()];
  return `${dia}-${mesAbreviado}`;
};

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

  const cantidades = data.map((cantidad, index) => index + 1);  

  const grafico = {
    title: {
      text: "Grafico Analisis de Información",
      left: 'center',
    },
    xAxis: {
      type: "category",
      data: cantidades
    },
    tooltip: {
      trigger: "axis",
      min: 1
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
    animationDurationUpdate: 500
  };

  return grafico;
};

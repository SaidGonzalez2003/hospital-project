import axios from "axios";
import { getHorasCita, validarFecha } from "./funciones";

export const API = "http://192.168.1.69:3000/api";

export const getRegistrosByLoteEnsayo = async (lote, ensayo) => {
  const token = localStorage.getItem("token");
  try {
    // Hacer una solicitud GET al backend para obtener los registros
    const response = await axios.get(`${API}/registros/${lote}/${ensayo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devolver los datos
  } catch (error) {
    console.error("Hubo un error al obtener los registros:", error);
    return error; // Devolver el error si ocurre uno
  }
};

export const getEnsayos = async () => {
  const token = localStorage.getItem("token");
  try {
    // Hacer una solicitud GET al backend para obtener los registros
    const response = await axios.get(`${API}/ensayos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Devolver los datos
  } catch (error) {
    console.error("Hubo un error al obtener los registros:", error);
    return error; // Devolver el error si ocurre uno
  }
};

export const deleteRegistroById = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API}/registros/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return "";
};

export const getLoteLastValue = async () => {
  const token = localStorage.getItem("token");
  const result = await axios.get(API + "/lotes/last", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data[0].Id;
};

export const getAllLotes = async () => {
  const token = localStorage.getItem("token");
  const result = await axios.get(API + "/lotes/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export const addRegistros = async (data) => {
  try {
    if (!validarFecha(data.fecha)) {
      return "Fecha Incorrecta";
    }

    if (!data.valor || isNaN(Number(data.valor))) {
      return "El campo 'Valor' es obligatorio y debe ser un número";
    }

    if (!data.valor_z || isNaN(Number(data.valor_z))) {
      return "El campo 'Valor Z' es obligatorio y debe ser un número";
    }

    if (!data.id_lote || isNaN(Number(data.id_lote))) {
      return "El valor lote debe tener algun valor";
    }
    const token = localStorage.getItem("token");

    const response = await axios.post(API + "/registros/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addCita = async (data) => {
  try {
    if (!data.nombre || data.nombre.length <= 2) {
      return false;
    }

    if (!data.apellidos || data.apellidos.length <= 2) {
      return false;
    }

    if (!data.curp || data.curp.length !== 18) {
      return false;
    }

    if (!validarFecha(data.fecha)) {
      return false;
    }

    if (!esHoraValida(data.hora)) {
      return false;
    }

    const token = localStorage.getItem("token");

    const response = await axios.post(API + "/citas/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getHorasDisponibles = async (fecha) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API}/citas/hora/${fecha}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return getHorasCita(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const formatDate = (fecha) => {
  const date = new Date(fecha);
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const año = date.getFullYear();
  return `${dia}/${mes}/${año}`;
};

export const getCitasFirst = async () => {
  try {
    const token = localStorage.getItem("token");
    // Hacer una solicitud GET al backend para obtener los registros
    const response = await axios.get(`${API}/citas/first-citas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Devolver los datos
  } catch (error) {
    console.error("Hubo un error al obtener los registros:", error);
    return error; // Devolver el error si ocurre uno
  }
};

export const loginForm = async (usuario, password) => {
  try {
    const res = await axios.post(`${API}/users/login`, { usuario, password });


    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {

    if (err.status === 401) {
      return 401
    }

    return 500;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const validarToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false };

  try {
    const res = await axios.get(API + "/users/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // { success: true, usuario: '...' }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

function esHoraValida(texto) {
  const [h, m] = texto.split(":").map(Number);
  return h >= 0 && h < 24 && m >= 0 && m < 60;
}

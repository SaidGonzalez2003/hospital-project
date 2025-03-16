import axios from "axios";
import { validarFecha } from "./funciones";

export const getRegistrosByLoteEnsayo = async (lote, ensayo) => {
  try {
    // Hacer una solicitud GET al backend para obtener los registros
    const response = await axios.get(
      `http://localhost:3000/api/registros/${lote}/${ensayo}`
    );
    return response.data; // Devolver los datos
  } catch (error) {
    console.error("Hubo un error al obtener los registros:", error);
    return error; // Devolver el error si ocurre uno
  }
};

export const getEnsayos = async () => {
    try {
      // Hacer una solicitud GET al backend para obtener los registros
      const response = await axios.get(
        `http://localhost:3000/api/ensayos`
      );

      
      return response.data; // Devolver los datos
    } catch (error) {
      console.error("Hubo un error al obtener los registros:", error);
      return error; // Devolver el error si ocurre uno
    }
  };


export const deleteRegistroById = async (id) => {
  
    await axios.delete(`http://localhost:3000/api/registros/${id}`);
    return ""
  
};

export const getLoteLastValue = async () =>{
  const result = await axios.get('http://localhost:3000/api/lotes/last')

  
  return  result.data[0].Id
  
}

export const getAllLotes = async () =>{
  const result = await axios.get('http://localhost:3000/api/lotes/all')
  return  result.data
}

export const addRegistros = async (data) =>{

  try {
    
    if (!validarFecha(data.fecha)) {
      return "Fecha Incorrecta"
    }

    if (!data.valor || isNaN(Number(data.valor))) {
      return "El campo 'Valor' es obligatorio y debe ser un número";
    }

    if (!data.valor_z || isNaN(Number(data.valor_z))) {
      return "El campo 'Valor Z' es obligatorio y debe ser un número"
    }

    if (!data.id_lote || isNaN(Number(data.id_lote))) {
      return "El valor lote debe tener algun valor"
    }

    const response = await axios.post('http://localhost:3000/api/registros/add', data);
    

    return response
    

  } catch (error) {
    console.log(error);
    
  }

}

export const formatDate = (fecha) => {
  const date = new Date(fecha);
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const año = date.getFullYear();
  return `${dia}/${mes}/${año}`;
};

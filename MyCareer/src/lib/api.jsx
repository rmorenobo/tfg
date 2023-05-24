import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const api = axios.create({
  baseURL: 'http://192.168.0.28:3000', // Tu base URL
});

export const getUniversities = async () => {
  try {
    const response = await api.get('/queryAllByType/Universidad'); 
    return response.data;
  } catch (error) {
    console.error('Error al obtener las universidades', error);
    return [];
  }
};

export const vaidateUser = async (userId) => {
  try {
    
    const response = await api.get(`/validausuario/${userId}`); 
    return response.data;
  } catch (error) {
    console.info('Error al obtener Usuario', error);
    return [];
  }
};

export const getMisAlumnosList = async (idProfe) => {
  try {
   
    const response = await api.get(`/misalumnos/${idProfe}`); 

    const datosOrdenados = response.data.sort((a, b) => {
      // Ordenar por idUniversidad
      if(a.idUniversidad < b.idUniversidad) {
          return -1;
      }
      if(a.idUniversidad > b.idUniversidad) {
          return 1;
      }  
      // Si idUniversidad es igual, ordenar por idCarrera
      if(a.idCarrera < b.idCarrera) {
          return -1;
      }
      if(a.idCarrera > b.idCarrera) {
          return 1;
      }
      // Si idUniversidad y idCarrera son iguales, ordenar por idAsignatura
      if(a.idAsignatura < b.idAsignatura) {
          return -1;
      }
      if(a.idAsignatura > b.idAsignatura) {
          return 1;
      }
  
      // Si idUniversidad, idCarrera y idAsignatura son iguales, ordenar por idAlumno
      if(a.idAlumno < b.idAlumno) {
          return -1;
      }
      if(a.idAlumno > b.idAlumno) {
          return 1;
      }
  
      return 0; // Si todos son iguales
  });
    return datosOrdenados;
  } catch (error) {
    console.info('Error al obtener Mis alumnos', error);
    return [];
  }
};
export const getMisCarrerasList = async (idAlu) => {
  try {
    
    const response = await api.get(`/misasignaturas/${idAlu}`); 
    const datosOrdenados = response.data.sort((a, b) => {
            // Ordenar por idUniversidad
            if(a.idUniversidad < b.idUniversidad) {
                return -1;
            }
            if(a.idUniversidad > b.idUniversidad) {
                return 1;
            }
        
            // Si idUniversidad es igual, ordenar por idCarrera
            if(a.idCarrera < b.idCarrera) {
                return -1;
            }
            if(a.idCarrera > b.idCarrera) {
                return 1;
            }
        
            // Si idUniversidad y idCarrera son iguales, ordenar por idAsignatura
            if(a.idAsignatura < b.idAsignatura) {
                return -1;
            }
            if(a.idAsignatura > b.idAsignatura) {
                return 1;
            }
            return 0; // Si todos son iguales
    });
    return datosOrdenados;
  } catch (error) {
    console.info('Error al obtener las MisCarreras', error);
    return [];
  }
};
export const getMisCarrerasAgrupadasList = async (idAlu) => {
  try {
    const response = await api.get(`/misasignaturas/Agrupadas/${idAlu}`); 
    return response.data;
  } catch (error) {
    console.info('No hay carreras activas', error);
    return [];
  }
};

export const setMyCareerNotes = async (myCareerID, pec1, pec2, pec3, pac1, pac2, final) => {
  try {
    const response = await api.post(`/mycareerSetNote/${myCareerID}/${pec1}/${pec2}/${pec3}/${pac1}/${pac2}/${final}`);
    return response.data;
  } 
  catch (error) {
    console.error('Error al establecer las notas', error);
    throw error; 
  }
};
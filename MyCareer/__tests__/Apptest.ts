import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUniversities,setMyCareerNotes  } from '../src/lib/api';


const mockData = [
    {
        "objectId": "UAB",
        "data": {
            "idUniversidad": "UAB",
            "nombre": "Universitat autònoma de Barcelona"
        }
    },
    {
        "objectId": "UIB",
        "data": {
            "idUniversidad": "UIB",
            "nombre": "Universitat de les Illes Balears"
        }
    },
    {
        "objectId": "UOC",
        "data": {
            "idUniversidad": "UOC",
            "nombre": "Universitat oberta de Catalunya"
        }
    },
    {
        "objectId": "UPC",
        "data": {
            "idUniversidad": "UPC",
            "nombre": "Universitat politècnica de Catalunya"
        }
    },

];


let mock = new MockAdapter(axios);

describe('Listado universidades: getUniversities', () => {
  it('devuelve data en la llamada getUniversities', async () => {
    mock.onGet('/queryAllByType/Universidad').reply(200, mockData);
    const data = await getUniversities();
    expect(data).toEqual(mockData); 
  });
});

describe('Modificación de notas: setMyCareerNotes', () => {
    it('devuelve la de la Pac1 modificadas cuando se llama a setMyCareerNotes', async () => {
      const myCareerID = '1';
      const pec1 = 'A';
      const pec2 = 'B';
      const pec3 = 'C-';
      const pac1 = '-';
      const pac2 = '-';
      const final = '-';

      const mockData = "Transaction has been submitted";
  
      // Configuramos axios-mock-adapter para que devuelva nuestra mockData cuando se llame a la URL especificada.
      mock.onPost(`/mycareerSetNote/${myCareerID}/${pec1}/${pec2}/${pec3}/${pac1}/${pac2}/${final}`).reply(200, mockData);
      const data = await setMyCareerNotes(myCareerID, pec1, pec2, pec3, pac1, pac2, final);
      expect(data).toEqual(mockData); // Nos aseguramos de que los datos devueltos sean los que esperamos.
    });
  });

  describe('Error en Modificación de notas: setMyCareerNotes', () => {
    it('Lanza una excepción cuando se llama a  setMyCareerNotes con un Id inexistente', async () => {
      // Definimos los valores de prueba para los parámetros de la función.
      const myCareerID = 'invalidId';
      // Configuramos axios-mock-adapter para que devuelva un error 404 cuando se llame a la URL especificada.
      mock.onPost(`/mycareerSetNote/${myCareerID}`).reply(404);
      // Esperamos que la función lance un error.
      await expect(setMyCareerNotes(myCareerID)).rejects.toThrow();
    });
  });
  
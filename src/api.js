import axios from 'axios';


const api = axios.create({
    baseURL: 'https://8735-190-97-249-86.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning":"69420"}
})


export const postData = async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error; 
    }
  };
  
  
  export const getData = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  };
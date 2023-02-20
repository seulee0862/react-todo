import axios, { Axios } from 'axios';


export const fetchData = async() => {
    try {
        const response = await axios.get("http://localhost:8080/plan");
        return response.data;
      } catch (error) {
        console.error(error);
      }
}
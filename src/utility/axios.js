import axios from "axios";
import { router } from './helpers'
const baseURL = import.meta.env.VITE_BASE_API;

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  validateStatus: () => true,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          // Redirect to login page
          router.push('/login')
        } 
      }
      return Promise.reject(error)
    },
  );
  
export default apiClient;
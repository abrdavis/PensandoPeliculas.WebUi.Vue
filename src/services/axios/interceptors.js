
import { useAuthStore } from '@/stores';
import axios from "axios";


const axiosWebApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });
  
  axiosWebApi.interceptors.request.use(config => {
      config.withCredentials = true;
    return config;
  }, error => {
    return Promise.reject(error);
  });


axiosWebApi.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
    if(error.response.data.tokenCookieNotFound){
        const authStore = useAuthStore();
        authStore.logout();
    }
   }
   return error;
 });

 export default axiosWebApi;
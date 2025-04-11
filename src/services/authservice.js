import axios from "axios";
import { ApiPaths } from "@/utility/apiroutes";

export const authenticationService = {
    login,
    logout
};

function login(username, password) {
    return axios.post(`${import.meta.env.VITE_API_URL}/${ApiPaths.Authenticate}`, 
        { username: username, password: password })
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

async function  logout() {
    let url = `${import.meta.env.VITE_API_URL}/${ApiPaths.Logout}`
    await axios.get(url).then(res=>{
        console.log(res);

        }
    )
}

function handleResponse(response) {
    if (response.data) {
        const data = response.data.user;
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
        }
        else {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    }
}
       

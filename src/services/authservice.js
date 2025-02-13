import axios from "axios";
import { ApiPaths } from "@/utility/apiroutes";

export const authenticationService = {
    login,
    logout
};

function login(username, password) {
    return axios.post(`${import.meta.env.API_URL}/${ApiPaths.Authenticate}`, 
        { username: username, password: password })
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    if (response.data) {
        const data = response.data.user;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
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
       

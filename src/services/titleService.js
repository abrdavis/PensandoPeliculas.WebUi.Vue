import axios from "axios";
import { ApiPaths } from "@/utility/apiroutes";
import { authHeader } from "@/helpers/auth";

export const titleService = {
    getTitlesFilterByName,
    insertTitle
};

function getTitlesFilterByName(filterText) {
    return axios.get(`${import.meta.env.VITE_API_URL}/${ApiPaths.GetTitlesFilterByName}?filterText=${filterText}`)
        .then(res => {
            return res;
        });
}

function insertTitle(titleName, releaseDate, titleImage) {
    const requestData = {
        titleName: titleName,
        releaseDate: releaseDate,
        titleImage: titleImage
    }
    const url = `${import.meta.env.VITE_API_URL}/${ApiPaths.InsertTitle}`
    let headers = authHeader();
    headers['content-type'] = 'multipart/form-data';
    return axios.post(url, requestData, {headers: headers} )
    .then(res => {
        return res;
    });
}
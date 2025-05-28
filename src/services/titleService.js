import { ApiPaths } from "@/utility/apiroutes";
import axiosWebApi from "./axios/interceptors";

export const titleService = {
    getTitlesFilterByName,
    insertTitle,
    getTitles
};

function getTitlesFilterByName(filterText) {
    return axiosWebApi.get(`${ApiPaths.GetTitlesFilterByName}?filterText=${filterText}`)
        .then(res => {
            return res;
        });
}

function getTitles(resultCount = null,
    offset = null,
    orderBy = "") {
    return axiosWebApi.get(`${ApiPaths.TitlesGet}?resultCount=${resultCount}&resultOffset=${offset}&orderBy=${orderBy}`, {  withCredentials: true })
        .then(res => {
            return res;
        });
}

function insertTitle(titleName, releaseDate, titleImage, genre, durationMinutes) {
    const requestData = {
        titleName: titleName,
        releaseDate: releaseDate,
        titleImage: titleImage,
        genre: genre,
        durationMinutes: durationMinutes
    }
    const url = ApiPaths.InsertTitle;
    let headers = { 'content-type': 'multipart/form-data' };
    return axiosWebApi.post(url, requestData, { headers: headers, withCredentials: true })
        .then(res => {
            return res;
        });
}
import { ApiPaths } from "@/utility/apiroutes";
import axiosWebApi from "./axios/interceptors";


export const metaDataService = {
    getMetaDataViewModel,
    insertGenre,
    getAllGenres
};
function getMetaDataViewModel(){
    return axiosWebApi.get(`${ApiPaths.MetaDataGetAdminViewModel}`)
    .then(res => {
        return res;
    });
}
function getAllGenres() {
    return axiosWebApi.get(ApiPaths.GenresGetAll)
        .then(res => {
            return res;
        });
}

function insertGenre(genreName) {
    const requestData = {
        genreName: genreName
    }

    return axiosWebApi.post(ApiPaths.GenreInsert, requestData)
    .then(res => {
        return res;
    });
}
       

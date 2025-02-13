import axios from "axios";
import { ApiPaths } from "@/utility/apiroutes";
import { authHeader } from "@/helpers/auth";

export const reviewService = {
    getReviews,
    postReview,
    getRecentReviews
};

function getReviews() {
    return axios.get(`${import.meta.env.API_URL}/${ApiPaths.GetReviews}`)
        .then(res => {
            return res;
        });
}

function getRecentReviews(){
    const url  = `${import.meta.env.VITE_API_URL}/${ApiPaths.RecentReviews}`;
        return axios.get(url)        .then(res => {
        return res;
    });
}

function postReview(reviewTitleId, 
    reviewRating, 
    reviewPostTitle, 
    reviewText) {
    const requestData = {
        reviewTitleId: reviewTitleId,
        reviewRating: reviewRating,
        reviewTitle: reviewPostTitle,
        reviewText: reviewText,
        reviewAuthor: '',
        reviewDate: '',
        isVisible: true 

    }

    let headers = authHeader();
    headers['content-type'] = 'multipart/form-data';
    return axios.post(`${import.meta.env.VITE_API_URL}/${ApiPaths.PostReview}`, requestData, {headers: headers} )
    .then(res => {
        return res;
    });
}
       

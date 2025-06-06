import { ApiPaths } from "@/utility/apiroutes";
import axiosWebApi from "./axios/interceptors";


export const reviewService = {
    getReviews,
    insertReview,
    updateReview,
    getHomePageReviews,
    getReviewForSlug,
    getReviewForId
};
 function getReviewForSlug(reviewSlug){
    return axiosWebApi.get(`${ApiPaths.ReviewGetForSlug}?reviewSlug=${reviewSlug}`)
    .then(res => {
        return res;
    });
}


function getReviewForId(reviewId){
    return axiosWebApi.get(`${ApiPaths.ReviewGetForId}?reviewId=${reviewId}`)
    .then(res => {
        return res;
    });
}
function getReviews(resultCount = null, 
    offset = null, 
    orderBy = "") {
    return axiosWebApi.get(`${ApiPaths.ReviewGet}?resultCount=${resultCount}&resultOffset=${offset}&orderBy=${orderBy}`)
        .then(res => {
            return res;
        });
}

function getHomePageReviews(){
    const url  = ApiPaths.GetHomePageReviews;
        return axiosWebApi.get(url)        
            .then(res => {
        return res;
    });
}
 function updateReview(reviewId,
    reviewTitleId, 
    reviewRating, 
    reviewPostTitle, 
    reviewText,
    headerImage
){
    const requestData = {
        reviewId : reviewId,
        reviewTitleId: reviewTitleId,
        reviewRating: reviewRating,
        reviewTitle: reviewPostTitle,
        reviewText: reviewText,
        isVisible: true,
        headerImage: headerImage

    }
    let headers = {'content-type': 'multipart/form-data'};
    return axiosWebApi.post(ApiPaths.ReviewUpdate, requestData, {headers: headers, withCredentials: true} ).then(res => {return res;});
}
function insertReview(reviewTitleId, 
    reviewRating, 
    reviewPostTitle, 
    reviewText,
    headerImage) {
    const requestData = {
        reviewTitleId: reviewTitleId,
        reviewRating: reviewRating,
        reviewTitle: reviewPostTitle,
        reviewText: reviewText,
        isVisible: true,
        headerImage: headerImage

    }
    let headers = {'content-type': 'multipart/form-data'};
    return axiosWebApi.post(ApiPaths.ReviewInsert, requestData, {headers: headers, withCredentials: true} )
}
       

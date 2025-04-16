<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import { reviewService } from '@/services/reviewService';

import 'feather-icons/dist/feather.min.js'
const route = useRoute();
const reviewSlug = route.params.slug;

const reviewModel = ref(null);

async function onUpdateReview(titleForReview, reviewScore, reviewTitle, reviewText, reviewHeaderImg){
    return await reviewService.postReview(titleForReview, reviewScore, reviewTitle, reviewText, reviewHeaderImg);
}

onBeforeMount(async () => {
    let res = await reviewService.getReviewForSlug(reviewSlug)
    if (res.data && res.data.success) {
        reviewModel.value = res.data.reviewModel;
    }
    else {
        console.log(res)
    }
}
)

</script>

<template>
    <div>
        <h3>Add New Review</h3>
        <ReviewAdmin :review="reviewModel"  @on-form-submit="onUpdateReview"/>

    </div>

</template>
<style>
.poster-image {
    height: 400px !important;
}

.auto-complete-list-item {
    text-decoration: none;
    border: 1px solid black;
    padding: 2px;
    background-color: white;
}

.auto-complete-list {
    list-style: none;
    margin-left: 0px;
    padding-left: 0px;
}

.auto-complete-input {
    margin-bottom: 3px;
}


#reviewScoreInput {
    width: 155px;
}
</style>
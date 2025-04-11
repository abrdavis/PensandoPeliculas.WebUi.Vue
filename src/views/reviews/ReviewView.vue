<script setup>


import {ref} from 'vue'
import { useRoute } from 'vue-router';
import { reviewService } from '@/services/reviewService';

import 'feather-icons/dist/feather.min.js'
const route = useRoute();
const reviewSlug = route.params.slug;
const reviewModel = ref(null)
reviewService.getReviewForSlug(reviewSlug).then(res => {
    if(res.data && res.data.success){
        reviewModel.value = res.data.reviewModel;
    }
    else{
        console.log(res)
    }
});


</script>

<template>
    <div>
            <h3>{{reviewModel.reviewTitle}}</h3>
            <p>
                    {{reviewModel.reviewText}}
            </p>
    </div>
    
</template>

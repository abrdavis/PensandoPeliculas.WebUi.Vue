<script setup>

    import { reviewService } from '@/services/reviewService';
 

  

    let recentReviews = [];
    reviewService.getRecentReviews().then(res =>{
        const data = res.data;
            if(data.success){
                recentReviews = data.recentReviews;
            }
        }
    );


</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="text-center">
                Pensado Peliculas
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <h3>Recent Reviews</h3>
            <ul v-if="recentReviews?.length">
            <li v-for="review in recentViews" :key="review.reviewId"></li>
        </ul>
        </div>
    </div>
    <div>

    </div>
</template>
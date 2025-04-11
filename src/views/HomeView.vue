<script setup>

    import { reviewService } from '@/services/reviewService';
    import { ref } from 'vue'

  

    const recentReviews = ref([]);
    const recentReleaseReviews = ref([]);
    reviewService.getHomePageReviews().then(res =>{
        const data = res.data;
            if(data.success){
                recentReviews.value = data.pageModel.recentReviews;
                recentReleaseReviews.value = data.pageModel.recentReleasedReviews;
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
    <div class="row review-home-section">
        <div class="col-12">
            <h3 class="review-section-header">Recent Reviews</h3>
           <ReviewThumbnails :reviews="recentReviews"/>
        </div>
    </div>
    <div class="row review-home-section">
        <div class="col-12">
            <h3 class="review-section-header">Recently Released</h3>
           <ReviewThumbnails :reviews="recentReleaseReviews"/>
        </div>
    </div>
    <div>

    </div>
</template>


<style>
.review-home-section{
    min-height: 400px !important;
    margin-bottom:2em;
}


</style>
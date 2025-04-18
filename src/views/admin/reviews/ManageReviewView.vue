

<script setup>
import { reviewService } from '@/services/reviewService';
import { ref } from 'vue';

import 'feather-icons/dist/feather.min.js'
const reviews = ref([])
let columnData = [ {field: 'reviewTitle', headerText: 'Title'}, {field: 'titleName',  headerText: 'Movie'}, {field: 'reviewDate', headerText: 'Date'}];
reviewService.getReviews().then(res => {
    if(res.data && res.data.success){
        reviews.value = res.data.reviews;
    }
})








</script>

<template>
    <div>
        <h3>Peliculas Admin</h3>

        <DataTable :data="reviews" :columns="columnData" :primaryKey="'reviewId'" id="manageReviewsGrid" :showManageColumn="true"/>

    </div>
</template>

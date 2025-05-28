<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { reviewService } from '@/services/reviewService';
import { ReviewConstants } from '@/utility/constants/reviewconstants';
import 'feather-icons/dist/feather.min.js'
const route = useRoute();
const reviewId = route.params.id;

const reviewModel = ref(null);

onMounted(async () => {
    let res = await reviewService.getReviewForId(reviewId)
    if (res.data && res.data.success) {
        reviewModel.value = res.data.reviewModel;
    }
    else {
        console.log(res)
    }
})

</script>

<template>
    <div>
        <h3>Update Review</h3>
        <ReviewAdmin v-if="reviewModel" :review="reviewModel"  :mode="ReviewConstants.Update"/>
    </div>
</template>
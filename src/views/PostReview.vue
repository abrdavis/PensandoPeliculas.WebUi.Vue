<script setup>
import { reviewService } from '@/services/reviewService';
    import { ref} from 'vue'
    const reviewText = ref('')
    
    function postReviewClick(){
        reviewService.postReview('', '', reviewText.value)
    }
</script>

<template>
    <div>
        <textarea v-model="reviewText"></textarea>
        <button @click="postReviewClick">Post Review</button>
    </div>
</template>
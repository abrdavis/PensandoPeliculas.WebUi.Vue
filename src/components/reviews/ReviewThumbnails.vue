<script>
export default {
  name: 'ReviewThumbnails',
  props: {
    reviews: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<script setup>



</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <div id="thumbContainer">
          <div class="d-inline float-left" v-for="review in reviews"           :key="review.ReviewId" >
           <a v-bind:href="`/review/${review.slug}`"> <img 
v-bind:src="review.posterThumbnailUrl
" class="review-poster-home" /></a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {}

.review-poster-home {
  width: 200px;
  margin-right: 2em;
  margin-bottom:10px;
}

.thumbnail{
  max-width: 200px;
}
</style>

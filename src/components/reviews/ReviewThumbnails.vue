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
        <div id="thumbContainer" class="grid mx-auto">
          <div c v-for="review in reviews" :key="review.ReviewId" class="p-4">

            <a v-bind:href="`/review/${review.slug}`"
              class="justify-content-end flex-column text-decoration-none thumb-link overflow-hidden">
              <img v-bind:src="review.headerImageUrl" class="review-poster-home  position-absolute w--100 h-100" />
              <h3 class="d-inline thumb-overlay">
                <span class="text-white">  {{ review.titleName }}</span>
              </h3>
              <div class="d-flex justify-between z-10 mt-2 text-white">

                <div class="d-flex justify-start items-center">
                  <div class="rating-box position-relative">
                      {{ review.reviewRating }} / 10
                  </div>
                </div>
                <div class="montserrat-500 text-white text-sm">
                  {{review.reviewAuthor}}
                 </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {}
.items-center {
  align-items: center;
}
.justify-between{
  justify-content: space-between;
}
.justify-start{
  justify-content: flex-start;
}
.z-10{
  z-index:10;
}
.thumb-link {
  padding: 1.5rem !important;
  aspect-ratio: 16/9;
  position: relative;
  display: flex;
  font-family: freight-big-pro,serif;
  font-weight: 400;
}

.thumb-overlay {
  z-index: 10;
}

.review-poster-home {
  object-fit: cover;
  top: 0;
  left: 0;
  max-width: 100%;
  display: block;
}

#thumbContainer {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.grid {
  display: grid;
}
</style>

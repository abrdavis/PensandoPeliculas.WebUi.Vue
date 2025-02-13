<!-- eslint-disable no-undef -->
<script setup>

import { titleService } from '@/services/titleService';
import { reviewService } from '@/services/reviewService';
import { ref } from 'vue'
import AddTitleModal from '@/components/titles/AddTitleModal.vue';
import 'feather-icons/dist/feather.min.js'
const addTitleModal = ref(null);

const titleImageUrl = ref('')
const reviewText = ref('')
const reviewTitle = ref('')
const reviewScore = ref('')
const titleForReview = ref('')
const titleAutocompleteResults = ref([]);
const titleSearch = ref('')

function postReviewClick(){
    reviewService.postReview(titleForReview.value, reviewScore.value, reviewTitle.value, reviewText.value).then(res => {
        const data = res.data;
        if(data && data.success){
            this.$router.push({path: `/review/${data.reviewId}`});
        }
        else{
            console.log('Error saving review');
        }
    });
}


function showAddTitleModal() {
    addTitleModal.value.showModal()
}


function addTitleModalCallback(data) {
    console.log('callback called!');
    titleImageUrl.value = `${import.meta.env.VITE_BASE_URL}${data.posterImageUrl}`;
    titleForReview.value = data.title;

    
}


function filterTitles() {

    titleService.getTitlesFilterByName(titleSearch.value).then(res => {
        const data = res.data;
        if(data && data.success){
            titleAutocompleteResults.value = data.titles;
        }
    })
}
const selectTitle = (title) => {
    titleForReview.value = title.titleId
    titleSearch.value = title.titleName
    titleImageUrl.value = `${import.meta.env.VITE_BASE_URL}${title.posterUrl}`;
    titleAutocompleteResults.value = []
}

</script>
<style>
.poster-image{
  height:400px !important;
}

.auto-complete-list-item{
    text-decoration: none;
    border: 1px solid black;
    padding: 2px;
    background-color: white;
}

.auto-complete-list{
    list-style: none;
    margin-left: 0px;
    padding-left: 0px;
}

.auto-complete-input{
    margin-bottom: 3px;
}

</style>
<template>
    <div>
        <h3>Title Information</h3>
        <div class="row">
            <div class="col-3">
                <label for="titleSelect" class="form-label">Select Title</label>

                <input v-model="titleSearch" @keyup="filterTitles" id="titleSelect" class="form-control auto-complete-input" type="text"/>
                <ul v-if="titleAutocompleteResults.length" class="auto-complete-list">
                    <li
                    class="auto-complete-list-item"
                        v-for="title in titleAutocompleteResults"
                          @click="selectTitle(title)"
                        :key="title.titleId">
                        {{ title.titleName }}
                    </li>
                </ul>
                <a href="#" @click="showAddTitleModal">Add New Title</a>
            </div>
            <div class="col-9">
                <img id="titleImage" v-bind:src="titleImageUrl" class="poster-image"/>
            </div>

        </div>
        <div>
            <h3>
                Review
            </h3>
            <label for="reviewTitle" class="form-label">Title</label>
            <input v-model="reviewTitle" id="reviewTitle" class="form-control" />

            <label for="reviewText" class="form-label">Text</label>
            <textarea v-model="reviewText" class="form-control"></textarea>

            <label for="reviewScore" class="form-label">Rating</label>
            <input type="number" v-model="reviewScore" class="form-control" />
            <button @click="postReviewClick">Post Review</button>
        </div>
    </div>
    <AddTitleModal @add-title-modal-callback="addTitleModalCallback" ref="addTitleModal"></AddTitleModal>
</template>

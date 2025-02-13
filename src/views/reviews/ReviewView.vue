<!-- eslint-disable no-undef -->
<script setup>


import { ref } from 'vue'
import AddTitleModal from '@/components/titles/AddTitleModal.vue';
import 'feather-icons/dist/feather.min.js'
const addTitleModal = ref(null);
const titleAutocompleteResults = ref([]);


</script>

<template>
    <div>
        <h3>Title Information</h3>
        <div class="row">
            <div class="col-3">
                <label for="titleSelect" class="form-label">Select Title</label>
                <inpu v-model="titleSearch" @keyup="filterTitles" id="titleSelect" class="form-control" type="text"/>
                <ul v-if="titleAutocompleteResults.length">
                    <li
                        v-for="title in titleAutocompleteResults"
                        :key="title.titleId"
                    >
                        {{ title.titleName }}
                    </li>
                </ul>
 
                <a href="#" @click="showAddTitleModal">Add New Title</a>
            </div>
            <div class="col-9">
                <img id="titleImage" v-bind:src="titleImageUrl"/>
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

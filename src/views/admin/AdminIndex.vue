<!-- eslint-disable no-undef -->
<script setup>

import { ref } from 'vue'

import 'feather-icons/dist/feather.min.js'
const addTitleModal = ref(null);




function showAddTitleModal() {
    addTitleModal.value.showModal()
}







</script>

<template>
    <div>
        <h3>Peliculas Admin</h3>
        <div class="row">
            <div class="col-12">
                <a href="review/insert" @click="showAddTitleModal">Add Review</a>
                <a href="review/insert" @click="showAddTitleModal">Manage Reviews</a>
            </div>


        </div>

    </div>
</template>

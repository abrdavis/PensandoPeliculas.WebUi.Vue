<script setup>
import { titleService } from '@/services/titleService';
import { ref } from 'vue'
const titleName = ref('')
const releaseDate = ref('')
const posterImageUrl = ref('')


function insertTitleClick() {
    titleService.insertTitle(titleName, releaseDate, posterImageUrl)
}


</script>

<template>
    <div>
        <input v-model="titleName" type="text" />
        <textarea v-model="reviewText"></textarea>
        <input type="date" v-model="releaseDate" />
        <button @click="insertTitleClick">Insert Title</button>
    </div>
<InsertTitleModal ref="insertTitleModal"/>

</template>
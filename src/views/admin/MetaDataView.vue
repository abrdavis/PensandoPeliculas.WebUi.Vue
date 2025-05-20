<script setup>

import { metaDataService } from '@/services/metaDataService'
import { ref } from 'vue'
import {ToastService} from "@/services/toastService"

import feather from 'feather-icons/dist/feather.min.js'
import {sortObjectAlphabeticalByKey} from '@/helpers/array-helper'
  const genres = ref([])
const newGenreName = ref('')

const toastService = new ToastService();
    metaDataService.getMetaDataViewModel().then(res =>{
        const data = res.data;
            if(data.success){
                genres.value = data.viewModel.genres;
            }
        }
    );

    function addGenreClick(){
        if(newGenreName.value){
            metaDataService.insertGenre(newGenreName.value).then(res => {
                if(res.data && res.data.success){
                    newGenreName.value = '';
                    genres.value.push(res.data.genre);
                    genres.value = sortObjectAlphabeticalByKey(genres.value, 'genreName')
                    toastService.success("Genre added.");
                }
                else{
                    toastService.error("Error adding genre.");
                }
            })
        }
        else{
            toastService.error("Please specify a genre name.");
        }
    }

</script>
<template>
    <div>
        <h2 class="mb-5">Manage Metadata</h2>

        <div class="row mb-3">
            <div class="col-3">
                <h3>Genres</h3>
                <input type="text" v-model="newGenreName"/>
                <vue-feather type="plus" title="Add Genre" @click="addGenreClick"></vue-feather>
                <select multiple="multiple" class="d-block meta-list-box mt-3">
                <option v-for="genre in genres"
                        :key="genre.genreId">
                        {{ genre.genreName }}
            </option>
                </select>  
           
            </div>
 
        </div>

    </div>

</template>
<script>
    feather.replace();
</script>
<style>
.meta-list-box{
    width:400px;
}
</style>
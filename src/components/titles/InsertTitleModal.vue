<script>
  export default {
    name: 'InsertTitleModal',

  }
</script>

<script setup>

import { titleService } from '@/services/titleService';
import { metaDataService } from '@/services/metaDataService';
import { ref, onMounted  } from 'vue'


let titleModalRef = null;
const titleImage = ref('')
const titleName = ref('')
const titleReleaseDate = ref('')
const genres = ref([])
const titleDuration = ref(null);
let selectedGenre = null;
const emit = defineEmits(['insertTitleModalCallback'])

function closeModalEvent(){
    titleName.value= '';
    titleReleaseDate.value = '';
    titleDuration.value = null;
    titleReleaseDate.value = '';
}
function showModal() {
    // eslint-disable-next-line no-undef
    titleModalRef = new bootstrap.Modal(document.getElementById('insertTitleModal'), {})
    titleModalRef.show();
}


function insertTitleClick() {
    titleService.insertTitle(titleName.value, titleReleaseDate.value, titleImage.value, selectedGenre, titleDuration.value).then(res => {
        const data = res.data;
        if(data && data.success){
            emit('insertTitleModalCallback', data);
            titleModalRef.hide();
        }
        else{
            console.log('error');
        }
    });
}

function onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
        return;
        titleImage.value = files[0];
}

function onGenreSelect(data){
    selectedGenre = data;
}
onMounted(() => {
    metaDataService.getAllGenres().then(res =>{
        if(res.data && res.data.success){
            genres.value = res.data.genres;
        }
    })
})


defineExpose({
    showModal
});
</script>

<template>
    <div class="modal" tabindex="-1" id="insertTitleModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-5">
                        <div class="col-6">
                            <label for="titleReleaseDate" class="form-label">Name</label>
                            <input type="text" v-model="titleName" id="titleName" class="form-control" />
                        </div>

                        <div class="col-6">
                            <label for="titleReleaseDate" class="form-label d-block">Release Date</label>
                            <input type="date" v-model="titleReleaseDate" id="titleReleaseDate"
                                class="form-control d-inline-block" style="width:80%" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label>Genres</label>
                            <AutoComplete :inputData="genres" :inputKey="'genreName'" @auto-complete-select="onGenreSelect" :allowNewValues="true"/>
                        </div>
                        <div class="col-6">
                            <label>Duration (min.)</label>
                            <input type="number" v-model="titleDuration"/>
                        </div>
                    </div>
                    <div>
                        <label for="formFileLg" class="form-label">Poster Image</label>
                        <input class="form-control form-control-lg" id="formFileLg" type="file" @change="onFileChange">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModalEvent">Close</button>
                    <button type="button" class="btn btn-primary" @click="insertTitleClick">Add Title</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>

<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->
<script setup>
import { titleService } from '@/services/titleService';
import { ref } from 'vue'
// defineProps({
//     msg: {
//         type: String,
//         required: true
//     }
// })
let titleModalRef = null;
const titleImage = ref('')
const titleName = ref('')
const titleReleaseDate = ref('')
const emit = defineEmits(['addTitleModalCallback'])

function showModal() {
    titleModalRef = new bootstrap.Modal(document.getElementById('addTitleModal'), {})
    titleModalRef.show();
}


function addTitleClick() {
    titleService.insertTitle(titleName.value, '', titleImage.value).then(res => {
        const data = res.data;
        if(data && data.success){
            emit('addTitleModalCallback', data);
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

defineExpose({
    showModal
});
</script>

<template>
    <div class="modal" tabindex="-1" id="addTitleModal">
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
                    <div>
                        <label for="formFileLg" class="form-label">Large file input example</label>
                        <input class="form-control form-control-lg" id="formFileLg" type="file" @change="onFileChange">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="addTitleClick">Add Title</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>

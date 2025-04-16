<script setup>
import { router } from '../../../helpers'
import { titleService } from '@/services/titleService';
import { reviewService } from '@/services/reviewService';
import { ref } from 'vue'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { Spinner } from 'spin.js';
import 'feather-icons/dist/feather.min.js'

let spinner = null;
const reviewHeaderImg = ref(null);
const spinnerContainer = ref(null)
const insertTitleModal = ref(null);
const showDropdown = ref(false);
const titleImageUrl = ref('')
const titleForReview = ref(0)
const titleAutocompleteResults = ref([]);
const titleSearch = ref('')


const nonEmptyString = (value) => value.trim().length !== 0

const formValidationSchema = Yup.object().shape({
    reviewScore: Yup.number().min(0, "A movie can't really be worse than a 0.").max(10.0, "A score of ten is about as perfect as it gets.").required("You gotta let the people know what you think.")
        .test('decimal-range', 'Only one digit in the decimal place, please.', value => (value + "").match(/^\d*\.?\d{1}$/)),
    reviewText: Yup.string().required('Consider actually leaving a review').test('emptyString', 'Input is empty', nonEmptyString),
    reviewTitle: Yup.string().required('A good title goes a long way').test('emptyString', 'Input is empty', nonEmptyString),
    titleForReview: Yup.number().required().min(1, "Selecting a title is always a great idea.")
});

function onSubmit(values, { setErrors }) {

    const { reviewScore, reviewTitle, reviewText } = values;
    startSpin();
    return reviewService.postReview(titleForReview.value, reviewScore, reviewTitle, reviewText, reviewHeaderImg).then(res => {
        stopSpin();
        const data = res.data;
        if (data && data.success) {
            router.push({ path: `/review/${data.reviewId}` });
        }
        else {
            console.log('Error saving review');
        }
    }).catch(error => setErrors({ apiError: error }));

}

function onHeaderImageSelect(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
        return;
    reviewHeaderImg.value = files[0];
}



function showAddTitleModal() {
    insertTitleModal.value.showModal()
}



function resetSelectedTitle() {
    titleImageUrl.value = ''
    titleForReview.value = 0;
}
function filterTitles(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
        resetSelectedTitle();
    }
    titleService.getTitlesFilterByName(titleSearch.value).then(res => {
        const data = res.data;
        if (data && data.success) {
            titleAutocompleteResults.value = data.titles;
        }
    })
}

async function titleAutoCompleteBlur() {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200);

}

const selectTitle = (title) => {
    titleForReview.value = title.titleId
    titleSearch.value = title.titleName
    titleImageUrl.value = title.posterUrl;
    titleAutocompleteResults.value = []
}
function insertTitleModalCallback(data) {
    console.log('callback called!');
    titleImageUrl.value = `${import.meta.env.VITE_BASE_URL}${data.posterImageUrl}`;
    titleForReview.value = data.title;


}
function startSpin() {
    const config = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        color: '#000',
        speed: 1,
        trail: 60,
        fps: 20,
    };
    spinner = new Spinner(config).spin(spinnerContainer.value);
}
function stopSpin() {
    if (spinner) {
        spinner.stop();
        spinner = null;
    }
}

</script>

<template>
    <div>
        <h3>Add New Review</h3>
        <Form @submit="onSubmit" :validation-schema="formValidationSchema" v-slot="{ errors, isSubmitting }">
            <div class="row mb-3">
                <div class="col-3">
                    <label for="titleSelect" class="form-label">Title to Review</label>
                    <Field name="titleForReview" type="hidden" :class="{ 'is-invalid': errors.titleForReviewText }" />
                    <input v-model="titleSearch" name="titleForReviewText" @keyup="filterTitles"
                        @blur="titleAutoCompleteBlur" @focus="showDropdown = true" id="titleSelect"
                        class="form-control auto-complete-input" :class="{ 'is-invalid': errors.titleForReview }"
                        type="text" />
                    <div class="invalid-feedback">{{ errors.titleForReview }}</div>
                    <ul v-if="titleAutocompleteResults.length && showDropdown" class="auto-complete-list">
                        <li class="auto-complete-list-item" v-for="title in titleAutocompleteResults"
                            @click="selectTitle(title)" :key="title.titleId">
                            {{ title.titleName }}
                        </li>
                    </ul>
                    <a href="#" @click="showAddTitleModal">Add New Title</a>
                </div>
                <div class="col-9">
                    <img id="titleImage" v-bind:src="titleImageUrl" class="poster-image" />
                </div>
                <h3>
                    Review
                </h3>

                <div class="form-group">
                    <label for="reviewTitle" class="form-label">Review Title</label>
                    <Field name="reviewTitle" id="reviewTitle" class="form-control mb-2"
                        :class="{ 'is-invalid': errors.reviewTitle }" />
                    <div class="invalid-feedback">{{ errors.reviewTitle }}</div>
                </div>
                <div class="form-group">
                    <label for="reviewHeaderImg" class="form-label">Review Header</label>
                    <input class="form-control form-control-lg" id="reviewHeaderImg" type="file"
                        @change="onHeaderImageSelect">
                </div>
                <div class="form-group">
                    <label for="reviewText" class="form-label">Review Text</label>
                    <Field as="textarea" name="reviewText" class="form-control mb-2"
                        :class="{ 'is-invalid': errors.reviewText }" />
                    <div class="invalid-feedback">{{ errors.reviewText }}</div>
                </div>
                <div class="form-group">
                    <label for="reviewScore" class="form-label">Rating</label>
                    <Field type="number" name="reviewScore" class="form-control" id="reviewScore" min="0" max="10"
                        :class="{ 'is-invalid': errors.reviewScore }" />
                    <div class="invalid-feedback">{{ errors.reviewScore }}</div>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Post Review
                    </button>
                </div>
                <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
            </div>
        </Form>
        <InsertTitleModal @insert-title-modal-callback="insertTitleModalCallback" ref="insertTitleModal" />
        <!-- <ReviewAdmin/> -->

    </div>

</template>
<style>
.poster-image {
    height: 400px !important;
}

.auto-complete-list-item {
    text-decoration: none;
    border: 1px solid black;
    padding: 2px;
    background-color: white;
}

.auto-complete-list {
    list-style: none;
    margin-left: 0px;
    padding-left: 0px;
}

.auto-complete-input {
    margin-bottom: 3px;
}


#reviewScoreInput {
    width: 155px;
}
</style>
<script setup>
import { router } from '@/helpers'
import { ReviewConstants } from '@/utility/constants/reviewconstants';
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { Spinner } from 'spin.js';
import 'feather-icons/dist/feather.min.js'
import { titleService } from '@/services/titleService';
import {ToastService} from "@/services/toastService"
import { reviewService } from '@/services/reviewService';

defineOptions({
  name: 'ReviewAdmin',
});

const toastService = new ToastService()
const props = defineProps({
  review: {
    type: Object,
  },
  mode: {
    type: String
  },
});
console.log(props.review)
let spinner = null;
const spinnerContainer = ref(null)
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
  titleService.getTitlesFilterByName(titleName.value).then(res => {
    const data = res.data;
    if (data && data.success) {
      titleAutocompleteResults.value = data.titles;
    }
  })
}

function onHeaderImageSelect(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  reviewHeaderImg.value = files[0];

  headerImgPreview.value = URL.createObjectURL(files[0])
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

async function titleAutoCompleteBlur() {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
}

const selectTitle = (title) => {
  titleForReview.value = title.titleId
  titleName.value = title.titleName
  titleImageUrl.value = title.posterUrl;
  titleAutocompleteResults.value = []
}

function insertTitleModalCallback(data) {
  console.log('callback called!');
  titleImageUrl.value = `${import.meta.env.VITE_BASE_URL}${data.posterImageUrl}`;
  titleModel.value = data.title;

}

const headerImgPreview = ref(props.review?.headerImageUrl)
const reviewHeaderImg = ref(null);
const insertTitleModal = ref(null);
const titleAutocompleteResults = ref([]);
const titleModel = ref(null);
const titleImageUrl = ref(props.review?.posterUrl);
const showDropdown = ref(false);



const nonEmptyString = (value) => value.trim().length !== 0;
const formValidationSchema = Yup.object().shape({
  reviewRating: Yup.number().min(0, "A movie can't really be worse than a 0.").max(10.0, "A score of ten is about as perfect as it gets.").required("You gotta let the people know what you think.")
    .test('decimal-range', 'Only one digit in the decimal place, please.', value => (value + "").match(/^\d*\.?\d{1}$/)),
  reviewText: Yup.string().required('Consider actually leaving a review').test('emptyString', 'Input is empty', nonEmptyString),
  reviewTitle: Yup.string().required('A good title goes a long way').test('emptyString', 'Input is empty', nonEmptyString),
  titleForReview: Yup.number().required().min(1, "Selecting a title is always a great idea.")
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: formValidationSchema,
  initialValues: {
    reviewText: props.review?.reviewText,
    reviewTitle: props.review?.reviewTitle,
    reviewRating: props.review?.reviewRating,
    titleForReview: props.review?.reviewTitleId,
    titleName: props.review?.titleName
  },
});


const onSubmit = handleSubmit(values => {
  const { reviewRating, reviewTitle, reviewText } = values;

  startSpin();

  if (props.mode == ReviewConstants.Update) {
    reviewService.updateReview(props.review.reviewId, titleForReview.value, reviewRating, reviewTitle, reviewText, reviewHeaderImg.value).then(res => {
      if (res.data && res.data.success) {
        toastService.success("Review updated.");
      }
      else {
        toastService.error("Error updating review.");
      }
    });
  }
  else if (props.mode == ReviewConstants.Insert) {
    reviewService.insertReview(titleForReview.value, reviewRating, reviewTitle, reviewText, reviewHeaderImg.value).then(res => {
      if (res.data && res.data.success) {
        router.push({ path: `/review/${res.data.reviewId}` });
      }
      else {
        toastService.error("Error inserting review.");
      }
    });
  }

  stopSpin();

});

const [reviewText, reviewTextAttrs] = defineField('reviewText');
const [reviewTitle, reviewTitleAttrs] = defineField('reviewTitle');
const [reviewRating, reviewRatingAttrs] = defineField('reviewRating');
const [titleForReview, titleForReviewAttrs] = defineField('titleForReview');
const [titleName, titleNameAttrs] = defineField('titleName');

</script>

<template>
  <form @submit="onSubmit" id="reviewForm">
    <div class="row mb-3">
      <div class="col-xl-3 col-5">
        <img id="titleImage" v-bind:src="titleImageUrl" class="poster-image" />
      </div>
      <div class="col-xl-9 col-7">
        <label for="titleSelect" class="form-label">Title to Review</label>
        <input name="titleForReview" type="hidden" v-model="titleForReview" v-bind="titleForReviewAttrs" />
        <input name="titleSelect" @keyup="filterTitles" @blur="titleAutoCompleteBlur" @focus="showDropdown = true"
          id="titleSelect" class="form-control auto-complete-input" type="text" v-model="titleName"
          v-bind="titleNameAttrs" />
        <ul v-if="titleAutocompleteResults.length && showDropdown" class="auto-complete-list">
          <li class="auto-complete-list-item" v-for="title in titleAutocompleteResults" @click="selectTitle(title)"
            :key="title.titleId">
            {{ title.titleName }}
          </li>
        </ul>
        <a href="#" @click="showAddTitleModal">Add New Title</a>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="form-group">
          <label for="reviewTitle" class="form-label">Review Title</label>
          <input type="text" class="w-100" :class="{ 'is-invalid': errors.reviewTitle }" name="reviewTitle"
            id="reviewTitle" v-model="reviewTitle" v-bind="reviewTitleAttrs" />
          <div class="invalid-feedback">{{ errors.reviewTitle }}</div>
        </div>
      </div>
    </div>
    <div class="row form-group mb-3">
        <div class="col-3">
            <img class="revew-header-preview" :src="headerImgPreview"/>
        </div>
        <div class="col-9">
          <label for="reviewHeaderImg" class="form-label">Review Header</label>
          <input class="form-control form-control-lg w-100" id="reviewHeaderImg" name="reviewHeaderImg" type="file" 
            @change="onHeaderImageSelect">
        </div>

    </div>
    <div class="row">
      <div class="form-group">
        <label for="reviewText" class="form-label">Review Text</label>
        <textarea class="w-100" name="reviewText" id="reviewText" v-model="reviewText" v-bind="reviewTextAttrs"
          :class="{ 'is-invalid': errors.reviewText }"></textarea>
        <div class="invalid-feedback">{{ errors.reviewText }}</div>
      </div>
      <div class="form-group">
        <label for="reviewRating" class="form-label">Rating</label>
        <input name="reviewRating" id="reviewRating" type="number" v-model="reviewRating" v-bind="reviewRatingAttrs"
          min="0" max="10" :class="{ 'is-invalid': errors.reviewRating }" />
        <div class="invalid-feedback">{{ errors.reviewRating }}</div>
      </div>
      <button>Submit</button>
    </div>
  </form>
  <InsertTitleModal @insert-title-modal-callback="insertTitleModalCallback" ref="insertTitleModal" />
</template>

<style scoped>
.review-poster-home {
  width: 200px;
  margin-right: 2em;
  margin-bottom: 10px;
}

.revew-header-preview{
  max-width:100%;
}
.thumbnail {
  max-width: 200px;
}

label {
  font-weight: bold;
}

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
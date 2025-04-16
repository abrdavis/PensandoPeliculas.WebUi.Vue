<script setup>
// import { router } from '@/helpers'
// import { titleService } from '@/services/titleService';

import { ref } from 'vue'
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { Spinner } from 'spin.js';
import 'feather-icons/dist/feather.min.js'
import { titleService } from '@/services/titleService';
import { toast } from 'vue3-toastify';

defineOptions({
  name: 'ReviewAdmin',
});

const emit = defineEmits(['onFormSubmit'])
const props = defineProps({
  review: {
    type: Object
  }
});
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
const reviewHeaderImg = ref(null);
const insertTitleModal = ref(null);
const titleAutocompleteResults = ref([]);
const titleModel = ref(null);
const titleImageUrl = ref(props.review?.posterUrl);
const showDropdown = ref(false);


function insertTitleModalCallback(data) {
  console.log('callback called!');
  titleImageUrl.value = `${import.meta.env.VITE_BASE_URL}${data.posterImageUrl}`;
  titleModel.value = data.title;

}
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
  const { reviewScore, reviewTitle, reviewText } = values;
  startSpin();
  const result = emit('onFormSubmit', titleForReview.value, reviewScore, reviewTitle, reviewText, reviewHeaderImg)

  if(result.success){
    toast("Genre added.", {
        "theme": "dark",
        "type": "success",
        "dangerouslyHTMLString": true
      });
  }
  else{
    toast("Genre added.", {
        "theme": "dark",
        "type": "success",
        "dangerouslyHTMLString": true
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
      <div class="col-2">
        <img id="titleImage" v-bind:src="titleImageUrl" class="poster-image" />
      </div>
      <div class="col-10">
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
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="reviewTitle" class="form-label">Review Title</label>
          <input type="text" class="w-100" :class="{ 'is-invalid': errors.reviewTitle }" name="reviewTitle"
            id="reviewTitle" v-model="reviewTitle" v-bind="reviewTitleAttrs" />
          <div class="invalid-feedback">{{ errors.reviewTitle }}</div>
        </div>
        <div class="form-group">
          <label for="reviewHeaderImg" class="form-label">Review Header</label>
          <input class="form-control form-control-lg w-100" id="reviewHeaderImg" name="reviewHeaderImg" type="file">
        </div>
        <div class="form-group">
          <label for="reviewText" class="form-label">Review Text</label>
          <textarea class="w-100" name="reviewText" id="reviewText" v-model="reviewText"
            v-bind="reviewTextAttrs"  :class="{ 'is-invalid': errors.reviewText }" ></textarea>
            <div class="invalid-feedback">{{ errors.reviewText }}</div>
        </div>
        <div class="form-group">
          <label for="reviewRating" class="form-label">Rating</label>
          <input name="reviewRating" id="reviewRating" type="number" v-model="reviewRating"
            v-bind="reviewRatingAttrs" min="0" max="10"
                        :class="{ 'is-invalid': errors.reviewRating }" />
                    <div class="invalid-feedback">{{ errors.reviewRating }}</div>

        </div>
        <button>Submit</button>
      </div>
    </div>
  </form>
  <InsertTitleModal @insert-title-modal-callback="insertTitleModalCallback" ref="insertTitleModal" />
</template>

<style scoped>
@media (min-width: 1024px) {}

.review-poster-home {
  width: 200px;
  margin-right: 2em;
  margin-bottom: 10px;
}

.thumbnail {
  max-width: 200px;
}

label {
  font-weight: bold;
}
</style>

<script setup>

import 'feather-icons/dist/feather.min.js'
import { ReviewConstants } from '@/utility/constants/reviewconstants';



</script>

<template>
    <div>
        <h3>Add New Review</h3>
        <ReviewAdmin :mode="ReviewConstants.Insert"/>

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
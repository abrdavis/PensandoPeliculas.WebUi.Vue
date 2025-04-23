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

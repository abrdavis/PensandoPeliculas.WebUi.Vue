

<script setup>
import { ApiPaths } from "@/utility/apiroutes";

import 'feather-icons/dist/feather.min.js'

let columnData = [ {field: 'reviewTitle', headerText: 'Title'}, {field: 'titleName',  headerText: 'Movie'}, {field: 'reviewDate', headerText: 'Date'}];


const getUrl = `${import.meta.env.VITE_API_URL}/${ApiPaths.ReviewGet}`


</script>

<template>
    <div>
        <h3>Peliculas Admin</h3>

        <DataTable :columns="columnData" :primaryKey="'reviewId'" :editKey="'reviewId'" :editRoute="'Admin/review'" id="manageReviewsGrid" :showManageColumn="true" :apiPagination="true" :getUrl="getUrl" />

    </div>
</template>

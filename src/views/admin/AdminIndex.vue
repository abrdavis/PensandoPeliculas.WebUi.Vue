
<script setup>



import 'feather-icons/dist/feather.min.js'





</script>

<template>
    <div>
        <h3>Peliculas Admin</h3>
        <div class="row">
            <div class="col-12">
                <a href="admin/review/insert" @click="showAddTitleModal" class="d-block">Add Review</a>
                <a href="admin/review/insert" @click="showAddTitleModal" class="d-block">Manage Reviews</a>
                <a href="admin/review/insert" @click="showAddTitleModal" class="d-block">Manage Titles</a>
                <a href="admin/metadata" @click="showAddTitleModal" class="d-block">Manage Metadata</a>
            </div>


        </div>

    </div>
</template>

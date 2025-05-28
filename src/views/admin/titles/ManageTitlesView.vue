<script setup>

import { ref, onMounted } from 'vue'
import 'feather-icons/dist/feather.min.js'
import { titleService } from "@/services/titleService"

let columnData = [ {field: 'titleName', headerText: 'Title'}, {field: 'genreName',  headerText: 'Genre'}, {field: 'releaseDate', headerText: 'Released'}];
let titles = ref([])

onMounted(async () => {
    let res = await titleService.getTitles()
    if (res.data && res.data.success) {
        titles.value = res.data.titles;
    }
    else {
        console.log(res)
    }
})

</script>

<template>
    <div>
        <h3>Peliculas Admin</h3>

        <DataTable 
        v-if="titles.length > 0"
        :columns="columnData" 
        :primaryKey="'titleId'" 
        :editKey="'titleId'" 
        :editRoute="'Admin/title'" 
        id="manageTitleGrid" 
        :showManageColumn="true" 
        :data="titles" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axiosWebApi from "@/services/axios/interceptors";
import {ToastService} from "@/services/toastService"
defineOptions({
    name: 'DataTable',
});

import { router } from '@/helpers'
const props = defineProps({
    data: {
        type: Array,
    },
    columns: {
        type: Array,
    },
    primaryKey: {
        type: String,
        required: true
    },
    editKey: {
        type: String,
    },
    deleteKey: {
        type: String,
    },
    showManageColumn: {
        type: Boolean,
        default: false
    },
    resultsPerPage: {
        type: Number,
        default: 10
    },
    getUrl: {
        type: String,
    },
    editRoute:{
        type: String
    },
    apiPagination: {
        type: Boolean,
        default: false
    },
    orderBy:{
        type: String,
        default: ''
    }
});
const currentIndex = ref(0)
const currentPage = ref(1)
const dataRef = ref(props.data)
let toastService = new ToastService()
const endIndex = computed(() => {
    if(dataRef.value !== undefined)
        return  Math.min(currentIndex.value + props.resultsPerPage, dataRef.value?.length);
    else
        return 0;
    
})
const resultsToDisplay = computed(() => {
    if(props.apiPagination)
       return dataRef.value?.slice(currentIndex.value, endIndex.value);
    else
        return dataRef.value?.slice(currentIndex.value, endIndex.value);

});

const showNextPage = computed(() => {
    if(dataRef.value !== undefined)
        return endIndex.value < dataRef.value?.length || props.apiPagination ? true : false;
    return false;
})
const showPrevPage = computed(() => {
    return currentPage.value > 1;
})
let orderBy = props.orderBy ?? '';

function mapAttributes(index) {
    if (props.showManageColumn) {
        return {
           'data-edit-key': props.editKey,
           'data-index' : index
        }
    }
    else {
        return {};
    }


}
function prevPageClick() {
    if (props.apiPagination) {
        const resultOffset = Math.min(((currentPage.value) * props.resultsPerPage)-props.resultsPerPage, 1)
        axiosWebApi.get(`${props.getUrl}?resultCount=${props.resultsPerPage}&resultOffset=${resultOffset}&orderBy=${orderBy}`).then(res => {
        if(res && res.data){
            if(res.data.length <= 0){
                toastService.success("No more results found.");
            }
            else{
                dataRef.value = res.data;
                currentPage.value +=1;
            }
            
        }
        else{
            toastService.error("Error retrieving data");
        }
       })
    }
    else {
        currentIndex.value -= props.resultsPerPage;
    }
    currentPage.value -=1;
}

function nextPageClick() {
    if (props.apiPagination) {
        const resultOffset = props.resultsPerPage * currentPage.value;
       axiosWebApi.get(`${props.getUrl}?resultCount=${props.resultsPerPage}&resultOffset=${resultOffset}&orderBy=${orderBy}`).then(res => {
        if(res && res.data){
            if(res.data.length <= 0){
                toastService.success("No more results found.");
            }
            else{
                dataRef.value = res.data;
                currentPage.value +=1;
            }
            
        }
        else{
            toastService.error("Error retrieving data");
        }
       })
    }
    else {
        currentIndex.value += props.resultsPerPage;
        currentPage.value +=1;
    }
}

function editClick(e){
    const target = e.target;
    const parentTd = target.closest('td');
    const itemKey = parentTd.dataset.editKey;
    const index = parseInt(parentTd.dataset.index);
    const editKey = resultsToDisplay.value[index][itemKey];
    router.push(`/${props.editRoute}/${editKey}`);
}

onMounted(async () => {
  if(props.apiPagination && props.getUrl){
    let res = await axiosWebApi.get(`${props.getUrl}?resultCount=${props.resultsPerPage}&resultOffset=${endIndex.value}&orderBy=${orderBy}`)
        .then(res => {
            return res;
        });
    dataRef.value = res.data;
  }
})
</script>

<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="index" scope="col">{{ column.headerText }} </th>
                </tr>
                <td v-if="showManageColumn">

                </td>
            </thead>
            <tbody>
                <tr v-for="(dataRow, index) in resultsToDisplay" :key="index">
                    <td v-for="(column, index) in columns" :key="index">
                        {{ dataRow[column.field] }}
                    </td>
                    <td v-if="showManageColumn"  v-bind="mapAttributes(index)">
                        <vue-feather type="edit" title="Edit" @click="editClick"></vue-feather>
                        <vue-feather type="eye" title="View"></vue-feather>
                        <vue-feather type="delete" title="Delete"></vue-feather>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <span v-if="showPrevPage" @click="prevPageClick" class="pageNav">Prev Page</span>
                        <span v-if="showNextPage" @click="nextPageClick" class="pageNav">Next Page</span>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>



<style scoped>
input {
    width: 200px;
    padding: 8px;
    border: 1px solid #ccc;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    width: 200px;
}

li {
    padding: 8px;
    cursor: pointer;
}

li:hover {
    background-color: #f0f0f0;
}

.pageNav {
    cursor: pointer;
}
</style>
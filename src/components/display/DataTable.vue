<script setup>
import { ref, computed } from 'vue';

defineOptions({
    name: 'DataTable',
});


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
    apiPagination: {
        type: Boolean,
        default: false
    }
});
const currentIndex = ref(0)

const endIndex = computed(() => {
    return Math.min(currentIndex.value + props.resultsPerPage, props.data.length);
})
const resultsToDisplay = computed(() => {
    let result = props.data.slice(currentIndex.value, endIndex.value);
    return result;
});

const showNextPage = computed(() => {
    return endIndex.value < props.data.length ? true : false;
})
const showPrevPage = computed(() => {
    return currentIndex.value != 0 ? true : false;
})

const manageAttributes = computed(() => {
    if (props.showManageColumn) {
        return {
            readonly: this.isReadOnly,
            disabled: this.isReadOnly ? 'readonly' : ''
        }
    }
    else {
        return {};
    }


})
function prevPageClick() {
    if (props.apiPagination) {
        console.log('TODO: fetch via API');
    }
    else {
        currentIndex.value -= props.resultsPerPage;
    }
}

function nextPageClick() {
    if (props.apiPagination) {
        console.log('TODO: fetch via API');
    }
    else {
        currentIndex.value += props.resultsPerPage;
    }
}
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
                    <td v-for="(column, index) in columns" :key="index"
                    v-bind="manageAttributes">
                        {{ dataRow[column.field] }}
                    </td>
                    <td v-if="showManageColumn">
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
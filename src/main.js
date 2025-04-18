import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueFeather from 'vue-feather';
import App from './App.vue';
import { router } from './helpers'
import  InsertTitleModal from './components/titles/InsertTitleModal.vue'
import ReviewThumbnails from './components/reviews/ReviewThumbnails.vue';
import AutoCompleteInput from './components/inputs/AutoComplete.vue';
import ReviewAdmin from './components/reviews/ReviewAdmin.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
 import DatatTable from './components/display/DataTable.vue';
const app = createApp(App);
app.component(VueFeather.name, VueFeather);

app.component("DataTable", DatatTable);
app.component("ReviewAdmin", ReviewAdmin);
app.component("InsertTitleModal", InsertTitleModal);
app.component("AutoComplete", AutoCompleteInput);
app.component("ReviewThumbnails", ReviewThumbnails);


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(router);

app.mount('#app');
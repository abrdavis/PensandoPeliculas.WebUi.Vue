<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores';
import { authenticationService } from './services/authservice';
import 'vue3-toastify/dist/index.css';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
console.log(user)

async function logout() {
    await authenticationService.logout();
    authStore.logout();
}

</script>

<template>
    <div class="app-container bg-light">
        <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
            <div class="container-fluid">
                <RouterLink to="/" class="nav-item nav-link site-logo-text">Pensando Peliculas</RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="d-flex " role="search" v-if="user">
                        <RouterLink to="/admin" class="nav-item nav-link">Admin</RouterLink>
                        <RouterLink to="/admin/review/insert" class="nav-item nav-link">Post Review</RouterLink>
                        <span v-on:click="logout" style="color:purple" class="nav-link">Logout</span>
                    </form>
                </div>
            </div>
        </nav>


        <div class="container pt-4 pb-4 min-vh-100">
            <RouterView  />
            
        </div>
    </div>
</template>

<style scoped>

.nav-link{
    color: white !important;
}
.site-logo-text{
    font-size:1.6em;
}
a {
    cursor: pointer;
}

.app-container {
    min-height: 100%;
    height:100%;
}

.content-container{
    min-height: 100%;
    height:100%;
}
</style>

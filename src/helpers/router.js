import { createRouter, createWebHistory } from 'vue-router';
import {getCookie} from './cookie-helper'
import { useAuthStore } from '@/stores';
import { HomeView, LoginView, InsertTitleView, InsertReviewView, ReviewView, AdminView, MetaDataView, UpdateReviewView } from '@/views';



export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: HomeView },
        { path: '/login', component: LoginView },
        { path: '/title/insert', component: InsertTitleView },
        {
            path: '/admin',  children: [
                {
                    path: 'review/insert',
                    component: InsertReviewView
                },
                {
                    path: 'review/:slug',
                    component: UpdateReviewView
                },
                {
                    path: '', component: AdminView,
                },
                {
                    path: 'metadata', component: MetaDataView
                }
            ],
            meta: {
                roleRequired: 'true',
                roleType: 'admin',
                authRequired: 'true'
              },
        },
        { path: '/review/:slug', component: ReviewView },
    ]
});

router.beforeEach(async (to) => {

    const auth = useAuthStore();
    const authCookie = getCookie('X-Token-Valid');
    if (to.meta.roleRequired){
        console.log(to.meta)
    }

    if(!authCookie){
        auth.user = null;
    }
    if (to.meta.authRequired && !authCookie) {
        
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});
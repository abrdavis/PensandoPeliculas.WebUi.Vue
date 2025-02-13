import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { HomeView, LoginView, InsertTitleView, InsertReviewView, ReviewView, AdminView } from '@/views';



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
                    path: 'review/manage',
                    component: InsertReviewView
                },
                {
                    path: '', component: AdminView,
                }
            ],
            meta: {
                roleRequired: 'true',
                roleType: 'admin'
              },
        },
        { path: '/review/:id', component: ReviewView },
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const authRequired = to.path.indexOf('admin') >= 0 ? true : false;
    const auth = useAuthStore();
    if (to.meta.roleRequired){
        console.log(to.meta)
    }
        if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});
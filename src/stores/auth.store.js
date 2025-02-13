import { defineStore } from 'pinia';

import { fetchWrapper, router } from '@/helpers';
import { ApiPaths } from "@/utility/apiroutes";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            const requestUrl = `${import.meta.env.VITE_API_URL}/${ApiPaths.Authenticate}`;
            const response = await fetchWrapper.post(requestUrl, { username, password });
            if (response && response.success) {
                this.user = response.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                router.push(this.returnUrl || '/');
            }
            else {
                console.log("Invalid login info")
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});
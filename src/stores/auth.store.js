import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchWrapper, router } from '@/helpers';
import { ApiPaths } from "@/utility/apiroutes";

export const useAuthStore = defineStore('auth', {
    state: () => {
        const user = ref(null)
        return {
            user
        }
      },
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
            this.$reset();
            router.push('/login');
        }
    },
    persist: true
});
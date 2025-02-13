import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { ApiPaths } from "@/utility/apiroutes";



export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            const requestUrl = `${import.meta.env.VITE_API_URL}/${ApiPaths.PostReview}`;
            const response = await fetchWrapper.post(requestUrl);
            console.log(response)
        }
    }
});
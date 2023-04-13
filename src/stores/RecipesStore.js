import axios from "axios";
import { defineStore } from "pinia";

export const useRecipesStore = defineStore("RecipeStore", {
    state: () => {
        return {
            test: 2137
        }
    },
    actions: {
        async getCategories() {
           try{
            const res = axios.get(import.meta.env.VITE_API_BACKEND+"/api/Account/Register")
           }catch(error){

           }
        }
    }
})
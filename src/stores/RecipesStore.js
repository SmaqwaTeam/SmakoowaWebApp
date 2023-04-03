import { defineStore } from "pinia";

export const useRecipesStore = defineStore("RecipeStore", {
    state: () => {
        return {
            test: 2137
        }
    }
})
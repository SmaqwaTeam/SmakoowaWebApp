<script>
import { computed } from 'vue';
import RecipeCard from '../components/RecipeCard.vue';
import { useRecipesStore } from '../stores/RecipesStore';
import { mapState,mapActions } from 'pinia';
export default {
    name: 'Home',
    components: {
        RecipeCard
    },
    data(){
        return{
            allrecipes: null 
        }
    },
    computed:
    {
        ...mapState(useRecipesStore,{
      recipes: "recipes"
    })
    },
    methods:{
        ...mapActions(useRecipesStore, {
        getAllRecipes: "getAllRecipes",
    }),
    },
    created(){
        this.getAllRecipes()
    }
}
</script>


<template>
    <div class="container px-5 gap-5 flex flex-wrap justify-between items-center mx-auto">
        <div class="flex" v-if="recipes.allrecipes" v-for="rec in recipes.allrecipes">
            <RecipeCard  :alldata="rec"></RecipeCard>
        </div>
    </div>
</template>
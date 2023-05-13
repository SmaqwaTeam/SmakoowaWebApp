<template>
<div>
    <div class="container mx-auto" v-if="recipe">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"> {{ recipe.name }}</h1>
        <img v-if="imagesrc" class=" h-96 w-144 rounded-t-lg " :src="getimagesrc" alt="Recipe Image">
        <img v-else class=" rounded-t-lg" src="../assets/mealicon.jpg" alt="Default Recipe Image">
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"> {{ recipe.description }}</p>
        <p>Category: {{ getCategoryNameById(recipe.categoryId).name }}</p>
        <div>
            <h1 class="mb-4 text-2xl font-bold"> Ingredients</h1>
            <div v-for="(group,index ) in ingredients" >
                <p> Group {{ index}}</p> 
                <p class="font-bold" v-for="ingredient in group"> {{ ingredient.name }} </p>
            </div>
        </div>
        <div class="my-4">
            <h1 class="mb-4 text-2xl font-bold"> Instructions</h1>
            <div v-for="(inst,index ) in recipe.instructions" >
                <p> {{ index+1 }}. {{ inst.content }} </p>
            </div>
        </div>
        <CommentSection :id="parseInt(recipeid)" :comments="recipe.recipeComments"></CommentSection>
    </div>
    
    <div v-else>
        <p> ADD PLACEHOLDER HERE !!!!!</p>
    </div>
    
</div>
</template>
<script>
import { computed } from '@vue/reactivity';
import { mapActions, mapState } from 'pinia';
import { useRecipesStore } from '../stores/RecipesStore';
import CommentSection from '../components/CommentSection.vue';
export default {
    name: 'RecipeView',
    components: { CommentSection},
    props: {
        id: Number
    },
    computed: {
        ...mapState(useRecipesStore, {
            getCategoryNameById: "getCategoryNameById"
        }),
        getimagesrc()
        {
            if(this.imagesrc)
            {
               return import.meta.env.VITE_API_BACKEND+"/api/Images/GetRecipeImage/"+this.imagesrc 
            }
           else
           {
            return "../assets/mealicon.jpg"
           }
        }
    },
    data(){
        return {
          recipeid: this.$route.params.recipeid,
          recipe: null,
          ingredients: null,
          imagesrc: null
        }
    },
    async created(){
       this.recipe =  await this.getRecipeById(this.recipeid)
       this.imagesrc = this.recipe.imageId
       console.log(this.recipe)
       this.ingredients =  await this.groupByKey(this.recipe.ingredients,'group')
       console.log(this.ingredients)
    },
    methods: {
        ...mapActions(useRecipesStore,{
          getRecipeById: "getRecipeById"  
        }),
        groupByKey(array, key) {
        return array
        .reduce((hash, obj) => {
       if(obj[key] === undefined) return hash; 
       return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
        }, {})
    }
    }
}
</script>
<template>
    <div class="container">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"> Tags</h1>
        <div class="flex flex-wrap gap-5">
            <div v-for="tag in recipes.tags">
            <button @click="addtoArray(tag.id)" type="button" class="rounded-lg bg-orange-400 w-fit p-2" > {{ tag.name+tag.id }} </button> 
        </div>
        </div>
        <div v-if="recipesFromApi">
            <div class="flex flex-col mt-5">
                <h1 class="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl"> Recipes from this category</h1>
                <div class="flex gap-5 flex-wrap justify-between items-center mx-auto" >
                <div  v-for="rec in recipesFromApi">
                    <RecipeCard  :alldata="rec"></RecipeCard>
                </div>
                </div>
            </div> 
        </div>
        <div v-else>
            Click tag to show recipes
        </div>
        
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useRecipesStore } from '../stores/RecipesStore';
import RecipeCard from '../components/RecipeCard.vue';
export default{
    name:'TagsView',
    data(){
        return{
            recipesFromApi: null,
            selectedRecipesTags: [],
            tagId: null,
            showMessage: true
        }
    },
    created(){

        this.$watch(
      () => this.selectedRecipesTags,
      () => {
        console.log(this.selectedRecipesTags)
    })
    },
    components:{RecipeCard},
    computed: {
        ...mapState(useRecipesStore,{
            recipes: 'recipes'
        })
    },
    methods: {
        ...mapActions(useRecipesStore,{
            getRecipesByTags: 'getRecipesByTags'
        }),
        async addtoArray(id)
        {
            this.selectedRecipesTags.push(id)
            console.log(this.selectedRecipesTags)
            this.recipesFromApi =  await this.getRecipesByTags(this.selectedRecipesTags)
        },
        async showRecipesByTag(id)
        {
            this.selecetedRecipesTags = await this.getRecipesByTags(id)
        },
        goToPage(id)
        {
            this.selectedRecipesTags = null
            this.$router.push('/tags/'+id)
        }
    }
}
</script>
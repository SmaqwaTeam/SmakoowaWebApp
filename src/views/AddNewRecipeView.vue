<template>
    <div class="container mx-auto py-4">
        <h1 class="text-2xl text-center">Add a new recipe</h1>
        <form class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Description
      </label>
    </div>
    <div class="md:w-2/3">
      <textarea v-model="description" class="border rounded focus:bg-white focus:border-orange-500" id="recipe_descr" name="recipe_descr" rows="4" cols="50"> </textarea>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Title
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="title" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" id="inline-password" type="text" placeholder="Your dish's name">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label for="categories" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Category </label>
    </div>
      <div class="md:w-2/3">
        <select v-model="category" id="categories" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500">
          <option v-for="cat in recipes.categories" :value="cat.id">{{cat.name}}</option>
        </select>
      </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label for="tags" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Tags </label>
    </div>
      <div class="md:w-2/3">
        <select v-model="tags" multiple id="tags" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500">
          <option v-for="tag in recipes.tags" :value="tag.id">{{tag.name}}</option>
        </select>
      </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label for="categories" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Time to make </label>
    </div>
      <div class="md:w-2/3">
        <input type="range" min="0" max="4" step="0" v-model="timetomake"> 
        {{ timetomake }}
      </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label for="categories" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Servings </label>
    </div>
      <div class="md:w-2/3">
        <input type="range" min="0" max="5" step="0" v-model="servings"> 
        {{ servings }}
      </div>
  </div>
  <IngredientsForm @ingredientsdata="getIngredients"></IngredientsForm>
  <InstructionsForm @instructionsdata="getInstructions"></InstructionsForm>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button @click="submitForm" class="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Add it
      </button>
    </div>
  </div>
</form>
    </div>
</template>
<script>
import { useRecipesStore } from  '../stores/RecipesStore';
import { mapState,mapActions } from 'pinia';
import IngredientsForm from '../components/IngredientsForm.vue'
import InstructionsForm from '../components/InstructionsForm.vue';
export default {
  data(){
    return{
      title:null,
      description:null,
      category: null,
      tags:[],
      timetomake: 2,
      servings:3,
      instructions: null,
      ingredients:null,
    }
    
  },
  components:{
    IngredientsForm,
    InstructionsForm,
},
  computed: {
    ...mapState(useRecipesStore,{
      recipes: "recipes"
    })
    
  },
  created(){
  this.getCat();
  this.getTags();
},
methods: {
  ...mapActions(useRecipesStore, {
    getCat: "getCategories",
    getTags: "getTags",
    submitRecipe: "submitRecipe"
  }),
  getInstructions(inst){
    this.instructions= inst
  },
  getIngredients(ings){
    this.ingredients= ings
  },
  submitForm(){
    const payload = {name: this.title, description: this.description, servingsTier: this.servings, timeToMakeTier: this.timetomake, categoryId:this.category, tagIds:this.tags,ingredients:this.ingredients,instructions:this.instructions}
    this.submitRecipe(payload)
  }
},

}
</script>
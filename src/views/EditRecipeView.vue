<template>
  <div class="container mx-auto py-4" v-if="isLoaded">
    <h1 class="text-2xl text-center">Add a new recipe</h1>
    <form class="px-4" enctype="multipart/form-data">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Title
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="title"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
            id="inline-password"
            type="text"
            placeholder="Your dish's name"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Description
          </label>
        </div>
        <div class="md:w-2/3">
          <textarea
            v-model="description"
            class="border rounded focus:bg-white focus:border-orange-500 w-full"
            id="recipe_descr"
            name="recipe_descr"
            rows="4"
            cols="50"
          >
          </textarea>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            for="categories"
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            >Category
          </label>
        </div>
        <div class="md:w-2/3">
          <select
            v-model="category"
            id="categories"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
          >
            <option v-for="cat in recipes.categories" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            for="tags"
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            >Tags
          </label>
        </div>
        <div class="md:w-2/3">
          <select
            v-model="tags"
            multiple
            id="tags"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
          >
            <option v-for="tag in recipes.tags" :value="tag.id">
              {{ tag.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            for="categories"
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            >Time to make
          </label>
        </div>
        <div class="md:w-2/3">
          <input type="range" min="0" max="4" step="0" v-model="timetomake" />
          {{ getTimeToMakeFromId(timetomake)}}
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            for="categories"
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            >Servings
          </label>
        </div>
        <div class="md:w-2/3">
          <input type="range" min="0" max="5" step="0" v-model="servings" />
          {{ getServingsFromId(servings) }}
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            for="categories"
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            >Ingredients
          </label>
        </div>
        <div class="md:w-2/3">
          <IngredientsForm
            @ingredientsdata="getIngredients"
            :propingredients="recipe.ingredients"
          ></IngredientsForm>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            for="categories"
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            >Recipe Instructions
          </label>
        </div>
        <div class="md:w-2/3">
          <InstructionsForm
            @instructionsdata="getInstructions"
            :propinstructions="recipe.instructions"
          ></InstructionsForm>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            for="categories"
            class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
            >Image Upload</label
          >
        </div>
        <div class="md:w-2/3">
          <input type="file" @change="uploadFile" ref="file" />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            @click="editForm"
            class="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Edit this recipe
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useRecipesStore } from '../stores/RecipesStore'
import { mapState, mapActions } from 'pinia'
import IngredientsForm from '../components/IngredientsForm.vue'
import InstructionsForm from '../components/InstructionsForm.vue'
export default {
  data () {
    return {
      title: null,
      description: null,
      category: null,
      tags: [],
      timetomake: 2,
      servings: 3,
      recipe: null,
      recipeid: this.$route.params.editrecipeid,
      isLoaded: false,
      file: null
    }
  },
  components: {
    IngredientsForm,
    InstructionsForm
  },
  computed: {
    ...mapState(useRecipesStore, {
      recipes: 'recipes'
    })
  },
  async created () {
    this.recipe = await this.getRecipeById(this.recipeid)
    if (this.recipe) {
      this.isLoaded = true
      this.title = this.recipe.name
      this.description = this.recipe.description
      this.category = this.recipe.categoryId
      this.tags = this.recipe.tagIds
      this.timetomake = this.recipe.timeToMakeTier
      this.servings = this.recipe.servingsTier
    }
  },
  methods: {
    uploadFile () {
      this.file = this.$refs.file.files[0]
    },
    ...mapActions(useRecipesStore, {
      uploadImage: 'uploadImage',
      editRecipe: 'editRecipe',
      getRecipeById: 'getRecipeById',
      getTimeToMakeFromId: 'getTimeToMakeFromId',
      getServingsFromId: 'getServingsFromId'
    }),
    getInstructions (inst) {
      this.instructions = inst
    },
    getIngredients (ings) {
      this.ingredients = ings
    },
    editForm () {
      const tags = Object.values(this.tags)
      const payload = {
        recipeid: this.recipeid,
        name: this.title,
        description: this.description,
        servingsTier: this.servings,
        timeToMakeTier: this.timetomake,
        categoryId: this.category,
        tagIds: tags,
        ingredients: this.ingredients,
        instructions: this.instructions
      }
      this.editRecipe(payload)
      if (this.file != null) {
        const payload = { file: this.file, recipeid: this.recipeid }
        this.uploadImage(payload)
      }
    }
  }
}
</script>

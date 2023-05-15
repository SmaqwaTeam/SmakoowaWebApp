<template>
  <div class="container">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
    >
      Categories
    </h1>
    <div class="flex flex-wrap gap-5">
      <div v-for="cat in recipes.categories">
        <button
          type="button"
          @click="goToPage(cat.id)"
          class="bg-orange-300 rounded-lg w-fit max-h-fit p-2"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
    <div v-if="$route.params.categoryId">
      <div v-if="recipeCategories" class="flex flex-col mt-5">
        <h1
          class="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
        >
          Recipes from this category
        </h1>
        <div class="flex gap-5 flex-wrap justify-between items-center mx-auto">
          <div v-for="rec in recipeCategories">
            <RecipeCard :alldata="rec"></RecipeCard>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Click category to show recipe</div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useRecipesStore } from '../stores/RecipesStore'
import RecipeCard from '../components/RecipeCard.vue'
export default {
  name: 'CategoriesView',
  data () {
    return {
      recipeCategories: null,
      categoryId: null,
      showMessage: true
    }
  },
  created () {
    this.$watch(
      () => this.$route.params.categoryId,
      () => {
        console.log(this.$route.params.categoryId)
        if (this.$route.params.categoryId) {
          this.showMessage = false
          this.categoryId = this.$route.params.categoryId
          this.showRecipes(this.categoryId)
        }
      }
    )
  },
  mounted () {
    if (this.$route.params.categoryId) {
      this.categoryId = this.$route.params.categoryId
      this.showRecipes(this.categoryId)
    }
  },
  components: { RecipeCard },
  computed: {
    ...mapState(useRecipesStore, {
      recipes: 'recipes'
    })
  },
  methods: {
    ...mapActions(useRecipesStore, {
      getRecipesByCategory: 'getRecipesByCategory'
    }),
    async showRecipes (id) {
      this.recipeCategories = await this.getRecipesByCategory(id)
    },
    goToPage (id) {
      this.recipeCategories = null
      this.$router.push('/categories/' + id)
    }
  }
}
</script>

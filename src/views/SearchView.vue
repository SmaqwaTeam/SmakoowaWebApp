<template>
  <p class="text-center">What are you looking for?</p>
  <div class="my-5">
    <SearchBar @searchvariable="getSearchVar"> </SearchBar>
  </div>

  <div>
    <div
      class="container px-5 gap-5 flex flex-wrap justify-between items-center mx-auto"
    >
      <div class="flex" v-for="rec in recipes">
        <RecipeCard :alldata="rec"></RecipeCard>
      </div>
    </div>
  </div>
</template>
<script>
import { useRecipesStore } from '../stores/RecipesStore'
import { mapActions } from 'pinia'
import SearchBar from '../components/SearchBar.vue'
import RecipeCard from '../components/RecipeCard.vue'
export default {
  data () {
    return {
      searchvar: '',
      recipes: []
    }
  },
  computed: {},
  watch: {
    async searchvar (keyword) {
      this.recipes = []
      const recipes = await this.searchRecipe(keyword).then(function (result) {
        return result
      })
      this.recipes = recipes
      console.log(this.recipes)
    }
  },
  components: { SearchBar, RecipeCard },
  methods: {
    ...mapActions(useRecipesStore, {
      searchRecipe: 'searchRecipe'
    }),
    getSearchVar (srch) {
      this.searchvar = srch
    }
  }
}
</script>

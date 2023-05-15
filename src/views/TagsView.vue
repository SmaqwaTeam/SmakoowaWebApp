<template>
  <div class="container">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
    >
      Tags
    </h1>
    <div class="flex flex-wrap gap-5">
      <div v-for="tag in recipes.tags">
        <div
          class="flex flex-row rounded-lg items-center justify-center bg-orange-400 w-fit p-2"
        >
          <button
            :class="{
              'bg-yellow-400': selectedRecipesTags.find((e) => e == tag.id),
            }"
            @click="addtoArray(tag.id)"
            type="button"
            class="rounded-lg bg-orange-500 w-fit p-2"
          >
            {{ tag.name }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="recipesFromApi">
      <div class="flex flex-col mt-5">
        <h1
          class="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
        >
          Recipes from this category
        </h1>
        <div class="flex gap-5 flex-wrap justify-between items-center mx-auto">
          <div v-for="rec in recipesFromApi">
            <RecipeCard :alldata="rec"></RecipeCard>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Click tag to show recipes</div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useRecipesStore } from '../stores/RecipesStore'
import RecipeCard from '../components/RecipeCard.vue'
import { useUserStore } from '../stores/UserStore'
export default {
  name: 'TagsView',
  data () {
    return {
      recipesFromApi: null,
      selectedRecipesTags: [],
      tagId: null,
      showMessage: true
    }
  },
  mounted () {
    if (this.$route.params.tagId) {
      this.addtoArray(this.$route.params.tagId)
    }
  },
  created () {
    if (this.user.isLogged) {
      this.getUserLikedTags()
    }
    this.$watch(
      () => this.selectedRecipesTags,
      () => {
        console.log(this.selectedRecipesTags)
      }
    )
  },
  components: { RecipeCard },
  computed: {
    ...mapState(useRecipesStore, {
      recipes: 'recipes'
    }),
    ...mapState(useUserStore, {
      user: 'user'
    })
  },
  methods: {
    ...mapActions(useRecipesStore, {
      getRecipesByTags: 'getRecipesByTags'
    }),
    ...mapActions(useUserStore, {
      getUserLikedTags: 'getUserLikedTags'
    }),
    async addtoArray (id) {
      if (!this.selectedRecipesTags.find((e) => e === id)) {
        this.selectedRecipesTags.push(id)
        this.recipesFromApi = await this.getRecipesByTags(
          this.selectedRecipesTags
        )
      } else {
        this.selectedRecipesTags = this.selectedRecipesTags.filter((t) => {
          return t !== id
        })
        this.recipesFromApi = await this.getRecipesByTags(
          this.selectedRecipesTags
        )
      }
    },
    async showRecipesByTag (id) {
      this.selecetedRecipesTags = await this.getRecipesByTags(id)
    },
    goToPage (id) {
      this.selectedRecipesTags = null
      this.$router.push('/tags/' + id)
    }
  }
}
</script>

<template>
  <div>
    <div class="container mx-auto" v-if="recipe">
      <div class="flex flex-col">
        <h1
          class="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
        >
          {{ recipe.name }}
        </h1>
        <hr />
        <div class="flex flex-row justify-evenly py-2 gap-2">
          <div>
            Recipe by:
            <i><AuthorName :creatorId="recipe.creatorId"></AuthorName></i>
          </div>
          <div>Views: {{ recipe.viewCount }}</div>
          <div>Created at: {{ recipe.createdAt.split("T")[0] }}</div>
        </div>
        <hr />
        <div
          class="h-auto max-w-full rounded-lg border-orange-300 border-solid border-2 md:min-w-1/2  mx-auto my-2"
        >
          <img
            v-if="imagesrc"
            class="h-72 w-72 rounded-t-lg md:h-144 md:w-144"
            :src="getimagesrc"
            alt="Recipe Image"
          />
          <img
            v-else
            class="rounded-t-lg"
            src="../assets/mealicon.jpg"
            alt="Default Recipe Image"
          />
        </div>
        <hr />
        <div class="flex flex-row justify-evenly py-2 gap-2 bg-orange-100">
          <div class="">{{ getTimeToMakeFromId(recipe.timeToMakeTier) }}</div>
          <div class="">{{ getServingsFromId(recipe.servingsTier) }}</div>
          <div class="flex flex-row gap-2">
            <LikeButton v-if="user.isLogged" :recipeId="recipe.id">
            </LikeButton>
            <HeartIcon v-else class="h-6 w-6 text-white fill-current"></HeartIcon>
            <div>{{ recipe.likeCount }}</div>
          </div>
        </div>
        <hr />

        <p
          class="text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48"
        >
          {{ recipe.description }}
        </p>
        <div
          class="text-xl text-gray-900 bg-orange-200 rounded-lg w-fit p-2 cursor-pointer"
          @click="$router.push('/categories/' + recipe.categoryId)"
        >
          Category: {{ getCategoryNameById(recipe.categoryId).name }}
        </div>
        <div class="flex flex-row flex-wrap mt-4">
          <div v-for="tagId in recipe.tagIds">
            <button
              @click="$router.push('/tags/' + tagId)"
              type="button"
              class="rounded-full p-2 bg-orange-200"
            >
              #{{ getTagNameById(tagId) }}
            </button>
          </div>
        </div>
        <div>
          <h1 class="mb-4 text-2xl font-bold">Ingredients</h1>
          <div v-for="(group) in ingredients">
            <p class="font-bold" v-for="ingredient in group">
              {{ ingredient.name }}
            </p>
          </div>
        </div>
        <div class="my-4">
          <h1 class="mb-4 text-2xl font-bold">Instructions</h1>
          <div v-for="(inst, index) in recipe.instructions">
            <p>{{ index + 1 }}. {{ inst.content }}</p>
          </div>
        </div>
        <div class="flex flex-col">
          <p class="mb-4 text-2xl font-bold">Comments</p>
          <CommentSection
            :id="parseInt(recipeid)"
            :comments="recipe.recipeComments"
          ></CommentSection>
        </div>
      </div>
    </div>

    <div v-else>
      <p>😥</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useRecipesStore } from '../stores/RecipesStore'
import { useUserStore } from '../stores/UserStore'
import CommentSection from '../components/CommentSection.vue'
import AuthorName from '../components/AuthorName.vue'
import LikeButton from '../components/LikeButton.vue'
import { HeartIcon } from '@heroicons/vue/24/solid'
export default {
  name: 'RecipeView',
  components: { CommentSection, AuthorName, LikeButton, HeartIcon },
  props: {
    id: Number
  },
  computed: {
    ...mapState(useRecipesStore, {
      getCategoryNameById: 'getCategoryNameById'
    }),
    ...mapState(useUserStore, {
      user: 'user'
    }),
    getimagesrc () {
      if (this.imagesrc) {
        return (
          import.meta.env.VITE_API_BACKEND +
          '/api/Images/GetRecipeImage/' +
          this.imagesrc
        )
      } else {
        return '../assets/mealicon.jpg'
      }
    }
  },
  data () {
    return {
      recipeid: this.$route.params.recipeid,
      recipe: null,
      ingredients: null,
      imagesrc: null
    }
  },
  async created () {
    this.recipe = await this.getRecipeById(this.recipeid)
    this.imagesrc = this.recipe.imageId
    this.ingredients = await this.groupByKey(this.recipe.ingredients, 'group')
  },
  methods: {
    ...mapActions(useRecipesStore, {
      getRecipeById: 'getRecipeById',
      getTimeToMakeFromId: 'getTimeToMakeFromId',
      getServingsFromId: 'getServingsFromId',
      getTagNameById: 'getTagNameById'
    }),
    groupByKey (array, key) {
      return array.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash
        return Object.assign(hash, {
          [obj[key]]: (hash[obj[key]] || []).concat(obj)
        })
      }, {})
    }
  }
}
</script>

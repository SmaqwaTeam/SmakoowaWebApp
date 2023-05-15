<template>
  <div
    class="max-w-sm h-128 max-h-128 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200"
  >
    <img
      v-if="imagesrc"
      class="h-sm object-cover rounded-t-lg"
      :src="getimagesrc"
      alt="Recipe Image"
    />
    <img
      v-else
      class="h-sm object-cover rounded-t-lg"
      src="../assets/mealicon.jpg"
      alt="Default Recipe Image"
    />
    <div class="p-5 flex flex-col">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-orange-600 text-center"
      >
        {{ title }}
      </h5>
      <p
        @click="$router.push('/categories/' + categoryId)"
        class="text-center text-orange-300 font-extrabold hover:bg-orange-500"
      >
        {{ getCategoryNameById(categoryId).name }}
      </p>
      <button
        tyoe="button"
        @click="pushToPage(id)"
        class="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-300 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300"
      >
        Read more
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="flex flex-row justify-evenly mt-2">
        <div class="">{{ getTimeToMakeFromId(timeToMakeTier) }}</div>
        <div class="flex flex-row">
          <LikeButton v-if="user.isLogged" :recipeId="id"> </LikeButton>
          <HeartIcon v-else class="h-6 w-6 text-white fill-current"></HeartIcon>
          <div>{{ likeCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HeartIcon } from '@heroicons/vue/24/solid'
import { mapActions, mapState } from 'pinia'
import { useRecipesStore } from '../stores/RecipesStore'
import { useUserStore } from '../stores/UserStore'
import LikeButton from './LikeButton.vue'
export default {
  name: 'RecipeCard',
  props: {
    alldata: Object
  },
  created () {
    console.log(this.alldata)
  },
  components: { LikeButton, HeartIcon },
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
  methods: {
    ...mapActions(useRecipesStore, {
      getTimeToMakeFromId: 'getTimeToMakeFromId'
    }),
    pushToPage (id) {
      this.$router.push('/recipe/' + id)
    }
  },
  data () {
    return {
      id: this.alldata.id,
      title: this.alldata.name,
      description: this.alldata.description,
      categoryId: this.alldata.categoryId,
      tagIds: this.alldata.tagIds,
      imagesrc: this.alldata.imageId,
      likeCount: this.alldata.likeCount,
      timeToMakeTier: this.alldata.timeToMakeTier
    }
  }
}
</script>

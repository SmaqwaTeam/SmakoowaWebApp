<template>
  <div @click="toggleLike">
    <HeartIcon
      class="h-6 w-6 text-white fill-current"
      v-bind:class="{ 'fill-red-500': value }"
    >
    </HeartIcon>
  </div>
</template>
<script>
import { HeartIcon } from '@heroicons/vue/24/solid'
import { useRecipesStore } from '../stores/RecipesStore'
import { useUserStore } from '../stores/UserStore'
import { mapState, mapActions } from 'pinia'
export default {
  name: 'LikeButton',
  components: { HeartIcon },
  props: {
    recipeId: Number
  },
  computed: {
    ...mapState(useUserStore, {
      user: 'user'
    })
  },
  data: function () {
    return {
      value: false
    }
  },
  created () {
    if (this.user.isLogged) {
      if (this.user.userLikedRecipes.find((e) => e.id === this.recipeId)) {
        this.value = true
      }
    }
  },
  methods: {
    ...mapActions(useRecipesStore, {
      addLike: 'addLike',
      removeLike: 'removeLike'
    }),
    toggleLike () {
      this.value = !this.value
      if (this.value === true) {
        this.addLike(this.recipeId)
      } else {
        this.removeLike(this.recipeId)
      }
    }
  }
}
</script>

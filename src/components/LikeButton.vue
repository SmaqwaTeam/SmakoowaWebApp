<template>
    <div @click="toggleLike">
       <HeartIcon class="h-6 w-6 text-white" v-bind:class="{'text-red-500':value}" > </HeartIcon> 
    </div>
   
</template>
<script>
import { HeartIcon } from "@heroicons/vue/24/solid";
import { useRecipesStore } from "../stores/RecipesStore";
import { mapState,mapActions } from 'pinia';
export default {
    name:'LikeButton',
    components: { HeartIcon},
    props: {
        recipeId: Number
    },
    data: function() {
        return {
            value:false 
         };
    },
    methods: {
        ...mapActions(useRecipesStore,{
      addLike: "addLike",
      removeLike: "removeLike"
    }),
        toggleLike(){
            this.value = !this.value
            if(this.value == true)
            {
                this.addLike(this.recipeId)
            }
            else
            {
                this.removeLike(this.recipeId)
            }
        }
    }
}

</script>
<template>
    <div class="container mx-auto py-4" v-if="user.isLogged == true ">
        <div class="flex flex-wrap flex-col  items-center"> 
            <h1 class="text-2xl text-center"> Hello {{ user.login }}</h1>
            <button @click="goToAddRecipe" type="button" class="text-white bg-orange-400 w-1/3 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Add a new Recipe+</button>
            <div class="my-4 border-b border-gray-200 w-full ">
                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center justify-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li class="mr-2" role="presentation">
                    <button @click="$router.push('/profile/userrecipes')" class="inline-block p-4 border-b-2 rounded-t-lg " id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Your Recipes</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button @click="$router.push('/profile/usertags')" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 " id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Your Tags</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button @click="$router.push('/profile/userlikes')" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 " id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Your favourite Recipes</button>
                </li>
                </ul>
            </div>
            <div>
                <RouterView></RouterView>
            </div> 
    </div>
    </div>
    <div class="container  mx-auto py-4" v-else>
        <p> You are not currently logged!</p>
    </div>
</template>
<script>
import { useUserStore } from '../stores/UserStore';
import { mapState,mapActions } from 'pinia';
import  UserRecipeCard  from '../components/UserRecipeCard.vue';
import RecipeCard from '../components/RecipeCard.vue';
import UserTag from '../components/UserTag.vue';
export default {
    computed: {
        ...mapState(useUserStore, {
            user: "user"
        })
    },
    components:{ UserRecipeCard, RecipeCard,UserTag},
    async created(){
         // this.getUserRecipes()
          //      this.getLikedRecipes()
              //     this.getUserLikedTags()    
        },
    methods: {
        ...mapActions(useUserStore, {
          //  getUserRecipes: "getUserRecipes",
         //   getLikedRecipes: "getLikedRecipes",
          //  getUserLikedTags: "getUserLikedTags",
        }),
        
        goToAddRecipe() {
            this.$router.push("/addrecipe");
        }
    },

}

</script>
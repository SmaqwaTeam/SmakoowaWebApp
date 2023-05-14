<template>
    <div>
            <p class="text-2xl text-center">
                Your favourite recipes 
            </p>
            <div class="container px-5 gap-5 flex flex-wrap justify-between items-center mx-auto">
                <div class="flex" v-if="user.userLikedRecipes" v-for="rec in user.userLikedRecipes">
            <RecipeCard  :alldata="rec"></RecipeCard>
        </div>
            </div>
       </div>
</template>
<script>
import { useUserStore } from '../../stores/UserStore';
import { mapState,mapActions } from 'pinia';
import RecipeCard from '../RecipeCard.vue';
export default{
    name:'UserLikes',
    computed:{
        ...mapState(useUserStore,{
            user:'user'
        })
    },
    components:{RecipeCard},
    created(){
        this.getLikedRecipes()
    },
    methods:{
        ...mapActions(useUserStore, {
            getLikedRecipes: "getLikedRecipes",
        }),
    }
}
</script>
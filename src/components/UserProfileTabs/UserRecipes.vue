<template>
    <div>
        <p class="text-2xl text-center">
                Your Recipes 
        </p>
        <div class="flex flex-col items-center" >
            <div v-if="user.userRecipes" v-for="rec in user.userRecipes">
            <UserRecipeCard :alldata="rec"> </UserRecipeCard>
            </div>    
            </div>
        </div>
</template>
<script>
import { useUserStore } from '../../stores/UserStore';
import { mapState,mapActions } from 'pinia';
import UserRecipeCard from '../UserRecipeCard.vue';
export default{
    name:'UserRecipes',
    computed:{
        ...mapState(useUserStore,{
            user:'user'
        })
    },
    components:{UserRecipeCard},
    created(){
        this.getUserRecipes()
    },
    methods:{
        ...mapActions(useUserStore, {
            getUserRecipes: "getUserRecipes",
        }),
    }
    

}
</script>
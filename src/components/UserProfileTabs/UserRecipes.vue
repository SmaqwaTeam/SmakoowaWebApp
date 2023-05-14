<template>
    <div>
        <p class="text-2xl text-center">
                Your Recipes 
        </p>
        <div v-if="user.userRecipes" class="flex flex-col items-center" >
            <div  v-for="rec in user.userRecipes">
            <UserRecipeCard :alldata="rec"> </UserRecipeCard>
            </div>
             
        </div>
        <div v-else>
                <Placeholder></Placeholder>     
            </div>   
    </div>
        
</template>
<script>
import { useUserStore } from '../../stores/UserStore';
import { mapState,mapActions } from 'pinia';
import UserRecipeCard from '../UserRecipeCard.vue';
import Placeholder from '../Placeholder.vue';
export default{
    name:'UserRecipes',
    computed:{
        ...mapState(useUserStore,{
            user:'user'
        })
    },
    components:{UserRecipeCard,Placeholder},
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
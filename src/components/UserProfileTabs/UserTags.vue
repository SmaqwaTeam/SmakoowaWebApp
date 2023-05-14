<template>
     <div>
            <p class="text-2xl text-center">
                Your Subscribed tags 
            </p>
            <div v-if="user.userLikedTags" class="container px-5 gap-5 flex flex-wrap justify-between items-center mx-auto">
                <div class="flex" v-for="tag in user.userLikedTags">
                    <UserTag  :tag="tag"></Usertag>
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
import UserTag from '../UserTag.vue';
import Placeholder from '../Placeholder.vue';
export default{
    name:'UserTags',
    computed:{
        ...mapState(useUserStore,{
            user:'user'
        })
    },
    components:{UserTag,Placeholder},
    created(){
        if(this.user.isLogged)
        {
           this.getUserLikedTags()  
        }
    },
    methods:{
        ...mapActions(useUserStore, {
            getUserLikedTags: "getUserLikedTags",
        }),
    }
}
</script>
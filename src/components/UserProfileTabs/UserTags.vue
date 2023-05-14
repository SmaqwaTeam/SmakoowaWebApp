<template>
     <div>
            <p class="text-2xl text-center">
                Your Subscribed tags 
            </p>
            <div class="container px-5 gap-5 flex flex-wrap justify-between items-center mx-auto">
                <div class="flex" v-if="user.userLikedTags" v-for="tag in user.userLikedTags">
                    <UserTag  :tag="tag"></Usertag>
                </div>
            </div>
       </div>
</template>
<script>
import { useUserStore } from '../../stores/UserStore';
import { mapState,mapActions } from 'pinia';
import UserTag from '../UserTag.vue';
export default{
    name:'UserTags',
    computed:{
        ...mapState(useUserStore,{
            user:'user'
        })
    },
    components:{UserTag},
    created(){
        this.getUserLikedTags()
    },
    methods:{
        ...mapActions(useUserStore, {
            getUserLikedTags: "getUserLikedTags",
        }),
    }
}
</script>
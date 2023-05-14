<template>
    <div @click="toggleLike">
      <HandThumbUpIcon class="h-6 w-6 text-white fill-current" v-bind:class="{'fill-green-400':value}"></HandThumbUpIcon> 
    </div>
   
</template>
<script>
import { HandThumbUpIcon } from "@heroicons/vue/24/solid";
import {useUserStore} from "../stores/UserStore";
import { mapState,mapActions } from 'pinia';
export default {
    name:'LikeTagButton',
    components: { HandThumbUpIcon},
    props: {
        tagId: Number
    },
    computed: {
        ...mapState(useUserStore, {
            user: "user"
        })
    },
    data: function() {
        return {
            value:false 
         };
    },
    created(){
        if(this.user.isLogged)
        {
           if(this.user.userLikedTags.find(e => e.id === this.tagId))
           {
            this.value = true
           }
        }
    },
    methods: {
        ...mapActions(useUserStore,{
      addLikeToTag: "addLikeToTag",
      removeLikeToTag: "removeLikeToTag"
    }),
        toggleLike(){
            this.value = !this.value
            if(this.value == true)
            {
                this.addLikeToTag(this.tagId)
            }
            else
            {
                this.removeLikeToTag(this.tagId)
            }
        }
    }
}

</script>
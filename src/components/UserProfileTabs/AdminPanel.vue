<template>
    <div v-if="user.role === 'Admin'">
        <div v-for="stat in stats" class="my-2">
            <p>{{ stat }}</p>
        </div>    
    </div>
    <div v-else>
        Error
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '../../stores/UserStore';

export default{
    data(){
        return {
            stats: null
        }
    },
    computed:{
        ...mapState(useUserStore,{
           user:'user' 
        })
    },
   async created(){
       this.stats = await this.getStats()
       console.log(stats)
    },
    methods:{
        ...mapActions(useUserStore,{
            getStats: 'getStats'
        })
    }
}
</script>
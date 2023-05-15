<template>
    <div v-if="user.role === 'Admin'">
        <div v-for="stat in stats" class="my-2">
            <p>{{ stat.ControllerName }}</p>
            <div v-for="action in stat">
                {{ action.actionName }}: {{ action.requestCount }}
            </div>
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
    },
    methods:{
        ...mapActions(useUserStore,{
            getStats: 'getStats'
        })
    }
}
</script>
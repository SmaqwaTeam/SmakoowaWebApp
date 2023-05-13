<template>
    {{ AuthorName }}
</template>
<script>
import { mapActions } from 'pinia';
import {useUserStore} from '../stores/UserStore'
export default{
    name: 'AuthorName',
    props:{
        creatorId: Number
    },
    data(){
        return{
            AuthorName: "",
        }
    },
    created(){
    this.getName(this.creatorId)
    },
    methods:{
        ...mapActions(useUserStore,{
            getUserNameById:"getUserNameById"
        }),
        async getName(id)
    {
       const res = await this.getUserNameById(id)
       this.AuthorName = res
    },
    }
    
}
</script>
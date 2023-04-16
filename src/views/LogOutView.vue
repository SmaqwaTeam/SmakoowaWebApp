<template>
    <p class="size-2xl"> You have been logged out!</p>
</template>
<script>
import { useUserStore } from '../stores/UserStore';
import { mapActions,mapState } from 'pinia';
export default {
    computed: {
    ...mapState(useUserStore,{
      user: "user"
    })
    
  },
  created(){
    this.logout();
  },
  methods: {
    ...mapActions(useUserStore, {
        logout: "logoutUser",
    }),
  } 
}
</script>

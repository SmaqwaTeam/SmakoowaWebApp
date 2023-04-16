<template>
    <div class="container mx-auto py-4" v-if="user.isLogged == true ">
        <div class="flex flex-wrap flex-col  items-center"> 
            <h1 class="text-2xl text-center"> Hello {{ user.login }}</h1>
        <button type="button" class="text-white bg-orange-400 w-1/3 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Add a new Recipe+</button>
        <div>
            <p class="text-2xl text-center">
            Your Recipes
            </p>
            <div class="grid grid-col gap-4 " >
               <div class="rounded border-2 border-orange"> 
                   Recipe 1 Chicken
               </div>
               <div class="rounded border-2  border-orange">
                   Recipe 2 Chicken
               </div>
               <div class="rounded border-2 border-orange">
                   Recipe 3 Chicken 
               </div>
               <div class="rounded border-2 border-orange"> 
                   Recipe 1 Chicken
               </div>
               <div class="rounded border-2  border-orange">
                   Recipe 2 Chicken
               </div>
               <div class="rounded border-2  border-orange">
                   Recipe 3 Chicken 
               </div>            
            </div>
        </div>
       <div>
            <p class="text-2xl text-center">
                Your Subscribed tags 
            </p>
            <div class="grid grid-col bg-gray-100 text-center items-center italic">
                     <div> tag 1 </div>  
                     <div> tag 2 </div> 
                     <div> tag 3 </div> 
                     <div> tag 4 </div> 
            </div>
       </div>
       <div>
            <p class="text-2xl text-center">
                Your favourite recipes 
            </p>
            <div class="grid grid-cols-2">
                <div> recipe 1</div>
                <div> recipe 2</div>
                <div> recipe 3</div>
                <div> recipe 4</div>
                <div> recipe 5</div>
                <div> recipe 6</div>

            </div>
       </div>
    </div>
    </div>
    <div class="container  mx-auto py-4" v-else>
        <p> You are not currently logged!</p>
    </div>
</template>
<script>
import { useUserStore } from '../stores/UserStore';
import { mapState } from 'pinia';
export default {
    computed: {
    ...mapState(useUserStore,{
      user: "user"
    })
}
}

</script>
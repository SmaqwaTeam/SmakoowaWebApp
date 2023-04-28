<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200">
    <a href="#">
        <img class="rounded-t-lg" src="../assets/butterchicken.jpg" alt="butterchicken" />
    </a>
    <div class="p-5">
         <h5 class="mb-2 text-2xl font-bold tracking-tight text-orange-600 ">{{title}} </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
        <p> Category: {{ getCategoryNameById(categoryId).name}} </p>
        <button tyoe="button" @click="pushToPage(id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-orange-400 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
</div>
</template>
<script>
import { mapState } from 'pinia';
import { useRecipesStore } from '../stores/RecipesStore';
export default {
    name:'RecipeCard',
    props: {
        alldata: Object, 
    },
    computed: {
        ...mapState(useRecipesStore, {
            getCategoryNameById: "getCategoryNameById"
        })
    },
    methods:{
        pushToPage(id)
        {
            this.$router.push('recipe/'+id)
        }
    },
    created(){
        //console.log(this.$data)
    },
    data(){
        return{
            id: this.alldata.id,
            title: this.alldata.name,
            description: this.alldata.description,
            categoryId: this.alldata.categoryId,
            tagIds: this.alldata.tagIds,
            imagesrc: null,
        }
    },
}
</script>
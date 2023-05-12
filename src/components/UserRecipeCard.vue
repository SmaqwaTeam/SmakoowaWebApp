<template>
    <div v-if="show" class="flex items-center w-full max-w-1/2 my-2 p-4 bg-orange-300 rounded-lg">
        <div class="flex-shrink-0">
            <img v-if="imagesrc" class="w-8 h-8 rounded-full" :src="getimagesrc" alt="Recipe Image">
            <img v-else class="w-8 h-8 rounded-full" src="../assets/mealicon.jpg" alt="Default Recipe Image">
        </div>
        <div class="flex items-center ml-auto space-x-2">
            <p class="text-sm font-medium text-white p-1.5 rounded-lg">{{ title }}</p>
            <p class="text-sm font-small text-black p-1.5 rounded-lg"> {{getCategoryNameById(categoryId).name}}</p>
            <button type="button" @click="pushToPage(id)" class="bg-orange-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 h-8">Visit</button>
            <button type="button" @click="editPage(id)" class="bg-orange-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 h-8">Edit</button>
            <button type="button" @click="deleteUserRecipe(id)" class="bg-orange-600 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 h-8">Delete</button>
        </div>    
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useRecipesStore } from '../stores/RecipesStore';
import { useUserStore } from '../stores/UserStore';
export default {
    name:'RecipeCard',
    props: {
        alldata: Object, 
    },
    computed: {
        ...mapState(useRecipesStore, {
            getCategoryNameById: "getCategoryNameById"
        }),
        getimagesrc()
        {
            if(this.imagesrc)
            {
               return import.meta.env.VITE_API_BACKEND+"/api/Images/GetRecipeImage/"+this.imagesrc 
            }
           else
           {
            return "../assets/mealicon.jpg"
           }
        }
    },
    methods:{
        ...mapActions(useRecipesStore,{
            deleteRecipe: 'deleteRecipe'
        }),
        pushToPage(id)
        {
            console.log(this.getimagesrc)
            this.$router.push('recipe/'+id)
        },
        editPage(id)
        {
            this.$router.push('editrecipe/'+id)
        },
        async deleteUserRecipe(id)
        {
            const res = await this.deleteRecipe(id).then(function(result) {
                return result  
        })
        this.show = false
        }
    },
    data(){
        return{
            show: true,
            id: this.alldata.id,
            title: this.alldata.name,
            description: this.alldata.description,
            categoryId: this.alldata.categoryId,
            tagIds: this.alldata.tagIds,
            imagesrc: this.alldata.imageId,
        }
    },
}
</script>
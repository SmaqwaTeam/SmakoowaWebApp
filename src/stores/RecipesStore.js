import axios from "axios";
import { defineStore } from "pinia";

export const useRecipesStore = defineStore("RecipeStore", {
    state: () => {
        return {
            recipes: {
                categories: [],
                tags: [],
                allrecipes: [],
            }
            
        }
    },
    getters: {
        getCategoryNameById: (state) => {
            return (catId) => state.recipes.categories.find((category) => category.id === catId)
        }
    },
    actions: {
        async getRecipeById(id){
            try{
                const res = await axios.get(import.meta.env.VITE_API_BACKEND+"/api/Recipes/GetByIdDetailed/"+id)
                return res.data.content
            }catch(error){
                console.log(error)
            }
        },
        async getAllRecipes(){
            try{
                const res = await axios.get(import.meta.env.VITE_API_BACKEND+"/api/Recipes/GetAll")
                this.recipes.allrecipes = res.data.content
            }catch(error){
                console.log(error)
               }
        },
        async getCategories() {
          try{
            const res = await axios.get(import.meta.env.VITE_API_BACKEND+"/api/Categories/GetAll")
            let cat = res.data.content
            cat.forEach(element => {
                
                this.recipes.categories.push(element)
            });

        }catch(error){
            console.log(error)
           }
        },
        async getTags(){
            try{
                const res = await axios.get(import.meta.env.VITE_API_BACKEND+"/api/Tags/GetAll")
                let tags = res.data.content
                tags.forEach(element => {
                
                    this.recipes.tags.push(element)
                });
            }catch(error){
                console.log(error)
            }
        },
        async submitRecipe(payload){
            console.log(payload)
            try{
                const res = await fetch(
                    import.meta.env.VITE_API_BACKEND+"/api/Recipes/Create",
                      {
                        method: "POST",
                        headers: {
                          'Content-Type': 'application/json',
                          'accept': 'text/plain',
                          'Authorization': 'Bearer '+localStorage.getItem('userToken')
                        },
                        body:JSON.stringify({
                          "name":payload.name,
                          "description":payload.description,
                          "servingsTier":parseInt( payload.servingsTier),
                          "timeToMakeTier":parseInt(payload.timeToMakeTier),
                          "categoryId": payload.categoryId,
                          "tagIds":payload.tagIds,
                          "ingredients":payload.ingredients,
                          "instructions":payload.instructions,
                        })
                      }
                  );
                  const data = await res.json();
                  console.log(data)
                if(data.successStatus)
                {
                    console.log(data.message)
                    this.$router.push('/profile')
                }
                else
                {
                    alert(data.message)
                }
            }catch(error){
                console.log(error)
            }
        },
        async uploadImage(payload){
            let formData = new FormData();
      formData.append('file', payload.file);
            try{
                const res = await fetch(
                    import.meta.env.VITE_API_BACKEND+"/api/Images/AddImageToRecipe/"+payload.id,
                      {
                        method: "POST",
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          'accept': 'text/plain',
                          'Authorization': 'Bearer '+localStorage.getItem('userToken')
                        },
                        body: formData
                      }
                  );
                  const data = await res.json();
                  console.log(data)
                if(data.successStatus)
                {
                    console.log(data.message)
                    this.$router.push('/profile')
                }
                else
                {
                    alert(data.message)
                }
            }catch(error){
                console.log(error)
            }

        }
    }
})
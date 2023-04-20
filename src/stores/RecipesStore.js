import axios from "axios";
import { defineStore } from "pinia";

export const useRecipesStore = defineStore("RecipeStore", {
    state: () => {
        return {
            recipes: {
                categories: [],
                tags: []
            }
            
        }
    },
    actions: {
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
                          "servingsTier":payload.servingsTier,
                          "timeToMakeTier":payload.timeToMakeTier,
                          "categoryId": payload.categoryId,
                          "tagsIds":payload.tagsIds,
                          "ingredients":payload.ingredients,
                          "instructions":payload.instructions,
                        })
                      }
                  );
                  const data = await res.json();
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
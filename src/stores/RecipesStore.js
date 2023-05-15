import axios from 'axios'
import { defineStore } from 'pinia'

export const useRecipesStore = defineStore('RecipeStore', {
  state: () => {
    return {
      recipes: {
        categories: [],
        tags: [],
        allrecipes: []
      }
    }
  },
  getters: {
    getCategoryNameById: (state) => {
      return (catId) =>
        state.recipes.categories.find((category) => category.id === catId)
    }
  },
  actions: {
    getTagNameById (tagId) {
      return this.recipes.tags.find((tag) => tag.id === tagId).name
    },
    getTimeToMakeFromId (id) {
      const TimeToMake = [
        'Up To 15 Min',
        'From 15 To 30 Min',
        'From 30 To 45Min',
        'From 30 To 45 Min',
        'From 45 To 60 Min',
        'Over 60 Min'
      ]
      return TimeToMake[id]
    },
    getServingsFromId (id) {
      const TimeToMake = [
        'One or Two',
        'Two or Three',
        'Three or Four',
        'Four or Five',
        'Five or Six',
        'Over Six'
      ]
      return TimeToMake[id]
    },
    async getRecipeById (id) {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND +
            '/api/Recipes/GetByIdDetailed/' +
            id
        )
        return res.data.content
      } catch (error) {
        console.log(error)
      }
    },
    async getAllRecipes () {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND + '/api/Recipes/GetAll'
        )
        this.recipes.allrecipes = res.data.content
      } catch (error) {
        console.log(error)
      }
    },
    async getRecipesByCategory (id) {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND +
            '/api/Recipes/GetRecipesByCategoryId?categoryId=' +
            id
        )
        const content = res.data.content
        return content
      } catch (error) {
        console.log(error)
      }
    },
    async getRecipesByTags (arrayTagIds) {
      const slug = this.getSlugTagId(arrayTagIds)
      console.log(slug)
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND +
            '/api/Recipes/GetRecipesByTagIds?' +
            slug
        )
        const content = res.data.content
        console.log(content)
        return content
      } catch (error) {
        console.log(error)
      }
    },
    async getCategories () {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND + '/api/Categories/GetAll'
        )
        const cat = res.data.content
        cat.forEach((element) => {
          this.recipes.categories.push(element)
        })
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async getTags () {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND + '/api/Tags/GetAll'
        )
        const tags = res.data.content
        tags.forEach((element) => {
          this.recipes.tags.push(element)
        })
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async submitRecipe (payload) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND + '/api/Recipes/Create',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify({
              name: payload.name,
              description: payload.description,
              servingsTier: parseInt(payload.servingsTier),
              timeToMakeTier: parseInt(payload.timeToMakeTier),
              categoryId: payload.categoryId,
              tagIds: payload.tagIds,
              ingredients: payload.ingredients,
              instructions: payload.instructions
            })
          }
        )
        const data = await res.json()
        if (data.successStatus) {
          this.$router.push('/profile')
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editRecipe (payload) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Recipes/Edit/' +
            payload.recipeid,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify({
              name: payload.name,
              description: payload.description,
              servingsTier: parseInt(payload.servingsTier),
              timeToMakeTier: parseInt(payload.timeToMakeTier),
              categoryId: payload.categoryId,
              tagIds: payload.tagIds,
              ingredients: payload.ingredients,
              instructions: payload.instructions
            })
          }
        )
        const data = await res.json()
        if (data.successStatus) {
          this.$router.push('/profile')
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async uploadImage (payload) {
      const formData = new FormData()
      formData.append('image', payload.file)
      formData.append('type', payload.file.type)
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Images/AddImageToRecipe/' +
            payload.recipeid,
          {
            method: 'POST',
            headers: {
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            },
            body: formData
          }
        )
        const data = await res.json()
        if (data.successStatus) {
          this.$router.push('/profile')
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getImage (imageID) {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND +
            '/api/Images/GetRecipeImage/' +
            imageID
        )
        const image = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async searchRecipe (keyword) {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND +
            '/api/Recipes/SearchRecipesByName?querry=' +
            keyword
        )
        const data = res.data.content
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async addLike (recipeId) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Likes/AddRecipeLike/' +
            recipeId,
          {
            method: 'POST',
            headers: {
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
      } catch (error) {
        console.log(error)
      }
    },
    async removeLike (recipeId) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Likes/RemoveRecipeLike/' +
            recipeId,
          {
            method: 'DELETE',
            headers: {
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
      } catch (error) {
        console.log(error)
      }
    },

    async deleteRecipe (recipeId) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND + '/api/Recipes/Delete/' + recipeId,
          {
            method: 'DELETE',
            headers: {
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
        alert(data.message)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    getSlugTagId (tagIds) {
      let urlstring = ''
      tagIds.forEach(function (value, index) {
        if (index === 0) {
          urlstring += 'tagIds=' + value
        } else {
          urlstring += '&tagIds=' + value
        }
      })
      return urlstring
    }
  }
})

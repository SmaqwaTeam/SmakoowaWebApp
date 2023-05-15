import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('UserStore', {
  state: () => {
    return {
      user: {
        login: '',
        id: 1,
        isLogged: false,
        userRecipes: [],
        userLikedTags: [],
        userLikedRecipes: [],
        role: ''
      }
    }
  },
  actions: {
    async getUserRole(){
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Users/GetUserById/'+this.user.id,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
        this.user.role = data.content.userRoles[0]
      } catch (error) {
        console.log(error)
      }
    },
    async getStats () {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Statistics/GetAll',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
        console.log(data.content)
       return data.content
      } catch (error) {
        console.log(error)
      }
    },
    async registerUser (payload) {
      const username = payload.userlogin
      const useremail = payload.useremail
      const userpassword = payload.userpassword
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND + '/api/Account/Register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain'
            },
            body: JSON.stringify({
              UserName: username,
              email: useremail,
              password: userpassword
            })
          }
        )
        const data = await res.json()
        console.log(data.errors)

        if (data.successStatus) {
          alert(data.message)
          this.$router.push('/login')
        } else {
          const error = Object.entries(data.errors)
          alert(error)
          this.$router.go(0)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loginUser (payload) {
      const login = payload.login
      const password = payload.password
      const res = await fetch(
        import.meta.env.VITE_API_BACKEND + '/api/Account/Login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            UserName: login,
            password
          })
        }
      )
      const data = await res.json()
      if (data.successStatus) {
        const id = data.content.user.id
        const usertoken = data.content.token
        const userlogin = data.content.user.username
        this.user.login = userlogin
        this.user.id = id
        localStorage.setItem('userToken', usertoken)
        localStorage.setItem('userId', id)
        localStorage.setItem('userLogin', userlogin)
        console.log('user login')
        this.user.isLogged = true
        this.$router.push('/profile')
      } else {
        alert(data.message)
        this.$router.go(0)
      }
    },
    logoutUser () {
      localStorage.clear()
      this.user.login = ''
      this.user.id = ''
      this.user.isLogged = false
      console.log('Log out')
    },
    checkIfUserIsLogged () {
      if (localStorage.getItem('userLogin')) {
        this.user.login = localStorage.getItem('userLogin')
        this.user.id = localStorage.getItem('userId')
        this.user.isLogged = true
      }
    },
    async getUserRecipes () {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Recipes/GetCurrentUsersRecipes',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
        this.user.userRecipes = data.content
      } catch (error) {
        console.log(error)
      }
    },
    async getLikedRecipes () {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND + '/api/Recipes/GetLikedRecipies',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
        this.user.userLikedRecipes = data.content
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async postComment (payload) {
      const recipeId = payload.recipeId
      const content = payload.content
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Comments/AddRecipeComment/' +
            recipeId,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify({
              content
            })
          }
        )
        const data = await res.json()
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async addReply (payload) {
      const commentId = payload.commentId
      const content = payload.content
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Comments/AddCommentReply/' +
            commentId,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify({
              content
            })
          }
        )
        const data = await res.json()
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async deleteComment (id) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Comments/DeleteRecipeComment/' +
            id,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async deleteReply (id) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Comments/DeleteCommentReply/' +
            id,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async editComment (payload) {
      const commentId = payload.commentId
      const content = payload.content
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Comments/EditRecipeComment/' +
            commentId,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify({
              content
            })
          }
        )
        const data = await res.json()
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async editReply (payload) {
      const replyId = payload.replyId
      const content = payload.content
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Comments/EditCommentReply/' +
            replyId,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify({
              content
            })
          }
        )
        const data = await res.json()
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async addLikeToTag (tagId) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND + '/api/Likes/AddTagLike/' + tagId,
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
    async removeLikeToTag (tagId) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND +
            '/api/Likes/RemoveTagLike/' +
            tagId,
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
    // FIX
    async getUserLikedTags () {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND + '/api/Tags/GetUserLikedTags',
          {
            method: 'GET',
            headers: {
              accept: 'text/plain',
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
          }
        )
        const data = await res.json()
        this.user.userLikedTags = data.content
      } catch (error) {
        console.log(error)
      }
    },
    async getUserNameById (userId) {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_BACKEND + '/api/Users/GetUserById/' + userId
        )
        return res.data.content.username
      } catch (error) {
        console.log(error)
      }
    }
  }
})

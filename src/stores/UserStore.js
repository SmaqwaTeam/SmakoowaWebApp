import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            user: {
                login: "",
            id: 1,
            isLogged:false,
            userRecipes: [],
            userSubsribedTags: [],
            userLikedRecipes: []
            }
                
        }
    },
    actions: {
       async registerUser(payload){
            const username = payload.userlogin;
            const useremail = payload.useremail;
            const userpassword = payload.userpassword;
            try{
                        const res = await fetch(
                          import.meta.env.VITE_API_BACKEND+"/api/Account/Register",
                            {
                              method: "POST",
                              headers: {
                                'Content-Type': 'application/json',
                                'accept': 'text/plain'
                              },
                              body:JSON.stringify({
                                "UserName":username,
                                "email":useremail,
                                "password":userpassword
                              })
                            }
                        );
                        const data = await res.json();
        console.log(data)

            }catch(error)
            {
              console.log(error)
            }
          
        },
        async loginUser(payload){
            const login = payload.login
            const password = payload.password
            const res = await fetch(
                import.meta.env.VITE_API_BACKEND+"/api/Account/Login",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                  },
                  body: JSON.stringify({
                    "UserName":login,
                                "password":password
                  })
                }
            );
            const data = await res.json();
            console.log(data);
           let id = data.content.user.id
            let usertoken =data.content.token;
            let userlogin = data.content.user.username;
            this.user.login = userlogin
            this.user.id = id;
            localStorage.setItem("userToken",usertoken);
            localStorage.setItem("userId",id);
            localStorage.setItem("userLogin",userlogin);
            console.log("user login");
            this.user.isLogged = true;
            this.$router.push('/profile')
      
        },
        logoutUser(){
          localStorage.clear();
        this.user.login = ""
        this.user.id = ""
        this.user.isLogged = false;
          console.log("Log out");
          

        },
        checkIfUserIsLogged(){
          if(localStorage.getItem("userLogin"))
          {
            this.user.login = localStorage.getItem("userLogin");
            this.user.id = localStorage.getItem("userId"); 
            this.user.isLogged = true
          }
        },
        async getUserRecipes(){
          try{
              const res = await fetch(
                  import.meta.env.VITE_API_BACKEND+"/api/Recipes/GetCurrentUsersRecipes",
                    {
                      method: "GET",
                      headers: {
                        'Content-Type': 'application/json',
                        'accept': 'text/plain',
                        'Authorization': 'Bearer '+localStorage.getItem('userToken')
                      }
                    }
                );
                const data = await res.json();
                this.user.userRecipes = data.content 
          }catch(error){
              console.log(error)
          }
      },
      async getLikedRecipes(){
        try{
            const res = await fetch(
                import.meta.env.VITE_API_BACKEND+"/api/Recipes/GetLikedRecipies",
                  {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json',
                      'accept': 'text/plain',
                      'Authorization': 'Bearer '+localStorage.getItem('userToken')
                    }
                  }
              );
              const data = await res.json();
              this.user.userLikedRecipes = data.content 
        }catch(error){
            console.log(error)
        }
    },
    async postComment(payload)
    {
      const recipeId = payload.recipeId
      const content = payload.content
      try{
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND+"/api/Comments/AddRecipeComment/"+recipeId,
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('userToken')
              },
              body:JSON.stringify({
                "content":content,
              })
            }
        );
        const data = await res.json();
console.log(data)

}catch(error)
{
console.log(error)
}
    },
    async addReply(payload)
    {
      const commentId= payload.commentId
      const content = payload.content
      try{
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND+"/api/Comments/AddCommentReply/"+commentId,
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('userToken')
              },
              body:JSON.stringify({
                "content":content,
              })
            }
        );
        const data = await res.json();
console.log(data)

}catch(error)
{
console.log(error)
}
    },
    async deleteComment(id){
      try{
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND+"/api/Comments/DeleteRecipeComment/"+id,
            {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('userToken')
              },
            }
        );
        const data = await res.json();
console.log(data)
      }catch(error)
      {
        console.log(error)
      }
    },
    async deleteReply(id){
      try{
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND+"/api/Comments/DeleteCommentReply/"+id,
            {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('userToken')
              },
            }
        );
        const data = await res.json();
console.log(data)
      }catch(error)
      {
        console.log(error)
      }
    },
    async editComment(payload)
    {
      const commentId = payload.commentId
      const content = payload.content
      try{
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND+"/api/Comments/EditRecipeComment/"+commentId,
            {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('userToken')
              },
              body:JSON.stringify({
                "content":content,
              })
            }
        );
        const data = await res.json();
console.log(data)

}catch(error)
{
console.log(error)
}
    },
    async editReply(payload)
    {
      console.log(payload)
      const replyId = payload.replyId
      const content = payload.content
      try{
        const res = await fetch(
          import.meta.env.VITE_API_BACKEND+"/api/Comments/EditCommentReply/"+replyId,
            {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('userToken')
              },
              body:JSON.stringify({
                "content":content,
              })
            }
        );
        const data = await res.json();
console.log(data)

}catch(error)
{
console.log(error)
}
    },
    async getUserNameById(userId)
    {
      try{
        const res = await axios.get(import.meta.env.VITE_API_BACKEND+"/api/Users/GetUserById/"+userId)
        return res.data.content.username
      }catch(error)
      {
        console.log(error)
      }
    }    
    }
})
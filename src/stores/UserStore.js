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
    }
})
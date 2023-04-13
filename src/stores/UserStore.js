import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("RecipeStore", {
    state: () => {
        return {
            user: {
                login: "XDDDDD",
            email: "abc@xyz.com",
            id: 1,
            isLogged:false,
            userRecipes: [],
            userSubsribedTags: [],
            }
                
        }
    },
    actions: {
       async registerUser(payload){
            /*const username = payload.username;
            const useremail = payload.useremail;
            const userpassword = payload.userpassword;
            const res = await fetch(
                import.meta.env.VITE_API_BACKEND+"/api/Account/Register",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                  },
                  body: JSON.stringify({
                    username,
                    useremail,
                    userpassword
                  })
                }
            );
            const data = await res.json();
            console.log(data);
            console.log(payload)*/
            try {
              const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/c/?format=json');
              console.log(response)
            } catch (error) {
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
                    login,
                    password,
                  })
                }
            );
            const data = await res.json();
            console.log(data);
            console.log(payload)
        }    
    }
})
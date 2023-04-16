
import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import AddNewRecipeView from '../views/AddNewRecipeView.vue'
import LogOutView from '../views/LogOutView.vue'
const routes = [
        {path: '/', name:'Home', component:Home},
        {path:'/about', name:'About', component: About},
        {path:'/login', name:'Login', component: LoginView},
        {path: '/register', name:'Register', component:RegisterView},
        {path:  '/profile', name:'Profile ', component:ProfileView},
        {path: '/addrecipe', name:'AddRecipe', component:AddNewRecipeView},
        {path: '/logout', name:'Logout', component:LogOutView}

]
const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
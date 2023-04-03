
import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import LoginView from '../views/LoginView.vue'
const routes = [
        {path: '/', name:'Home', component:Home},
        {path:'/about', name:'About', component: About},
        {path:'/login', name:'Login', component: LoginView}
]
const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
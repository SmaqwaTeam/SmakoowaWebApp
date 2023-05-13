
import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import AddNewRecipeView from '../views/AddNewRecipeView.vue'
import LogOutView from '../views/LogOutView.vue'
import RecipeView from '../views/RecipeView.vue'
import EditRecipeView from '../views/EditRecipeView.vue'
import SearchView from '../views/SearchView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import TagsView from '../views/TagsView.vue'
const routes = [
        {path: '/', name:'Home', component:Home},
        {path:'/about', name:'About', component: About},
        {path:'/login', name:'Login', component: LoginView},
        {path: '/register', name:'Register', component:RegisterView},
        {path:  '/profile', name:'Profile ', component:ProfileView},
        {path: '/addrecipe', name:'AddRecipe', component:AddNewRecipeView},
        {path: '/logout', name:'Logout', component:LogOutView},
        {path: '/search', name:'Search', component:SearchView},
        {path: '/recipe', name:'Recipe',redirect: '/recipe/1', component:RecipeView,
        children: [
            {
                path: ':recipeid',
                name: 'recipeById',
                component: RecipeView,
                props: route=> ({ id: parseInt(route.params.recipeid) }),
        }
        ]
        },
        {path: '/editrecipe', name:'EditRecipe', component:EditRecipeView,
        children: [
            {
                path: ':editrecipeid',
                name: 'editrecipeById',
                component: EditRecipeView,
                props: route=> ({ id: parseInt(route.params.editrecipeid) }),
        }
        ]
        },
        {path: '/categories', name:'Categories', component:CategoriesView,
        children: [
            {
                path: ':categoryId',
                name: 'categoryById',
                component: CategoriesView,
                props: route=> ({ id: parseInt(route.params.categoryId) }),
        }
        ]
        },
        {path: '/tags', name:'Tags', component:TagsView,
        children: [
            {
                path: ':tagId',
                name: 'tagById',
                component: TagsView,
                props: route=> ({ id: parseInt(route.params.tagId) }),
        }
        ]
        },

]
const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
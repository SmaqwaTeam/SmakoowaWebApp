
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
import UserLikes from '../components/UserProfileTabs/UserLikes.vue'
import UserTags from '../components/UserProfileTabs/UserTags.vue'
import UserRecipes from '../components/UserProfileTabs/UserRecipes.vue'
const routes = [
        {path: '/', name:'Home', component: ()=> import ('../views/Home.vue')},
        {path:'/about', name:'About', component: ()=> import ('../views/AboutView.vue')},
        {path:'/login', name:'Login', component: ()=> import ('../views/LoginView.vue')},
        {path: '/register', name:'Register', component:()=> import ('../views/RegisterView.vue')},
        {path:  '/profile', name:'Profile ', component:()=> import ('../views/ProfileView.vue'), redirect: '/profile/userrecipes',
        children: [
            {
               path:'userrecipes', name:'UserRecipes', component: ()=> import ('../components/UserProfileTabs/UserRecipes.vue') 
            },
            {
                path:'usertags', name:'UserLikedTags', component: ()=> import ('../components/UserProfileTabs/UserTags.vue')
             },
             {
                path:'userlikes', name:'UserLikedRecipes', component: ()=> import ('../components/UserProfileTabs/UserLikes.vue')
             },
        ]
        },
        {path: '/addrecipe', name:'AddRecipe', component:()=> import ('../views/AddNewRecipeView.vue')},
        {path: '/logout', name:'Logout', component:()=> import ('../views/LogoutView.vue')},
        {path: '/search', name:'Search', component:()=> import ('../views/SearchView.vue')},
        {path: '/recipe', name:'Recipe',redirect: '/recipe/1', component:()=> import ('../views/RecipeView.vue'),
        children: [
            {
                path: ':recipeid',
                name: 'recipeById',
                component: ()=> import ('../views/RecipeView.vue'),
                props: route=> ({ id: parseInt(route.params.recipeid) }),
        }
        ]
        },
        {path: '/editrecipe', name:'EditRecipe', component:()=> import ('../views/EditRecipeView.vue'),
        children: [
            {
                path: ':editrecipeid',
                name: 'editrecipeById',
                component: ()=> import ('../views/EditRecipeView.vue'),
                props: route=> ({ id: parseInt(route.params.editrecipeid) }),
        }
        ]
        },
        {path: '/categories', name:'Categories', component:CategoriesView,
        children: [
            {
                path: ':categoryId',
                name: 'categoryById',
                component: ()=> import ('../views/CategoriesView.vue'),
                props: route=> ({ id: parseInt(route.params.categoryId) }),
        }
        ]
        },
        {path: '/tags', name:'Tags', component:()=> import ('../views/TagsView.vue')},

]
const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
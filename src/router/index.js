import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/profile',
    name: 'Profile ',
    component: () => import('../views/ProfileView.vue'),
    redirect: '/profile/userrecipes',
    children: [
      {
        path: 'userrecipes',
        name: 'UserRecipes',
        component: () =>
          import('../components/UserProfileTabs/UserRecipes.vue')
      },
      {
        path: 'usertags',
        name: 'UserLikedTags',
        component: () => import('../components/UserProfileTabs/UserTags.vue')
      },
      {
        path: 'userlikes',
        name: 'UserLikedRecipes',
        component: () => import('../components/UserProfileTabs/UserLikes.vue')
      },
      {
        path: 'adminpanel',
        name: 'AdminPanel',
        component: () => import('../components/UserProfileTabs/AdminPanel.vue')
      },
    ]
  },
  {
    path: '/addrecipe',
    name: 'AddRecipe',
    component: () => import('../views/AddNewRecipeView.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/LogOutView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/recipe',
    name: 'Recipe',
    redirect: '/recipe/1',
    component: () => import('../views/RecipeView.vue'),
    children: [
      {
        path: ':recipeid',
        name: 'recipeById',
        component: () => import('../views/RecipeView.vue'),
        props: (route) => ({ id: parseInt(route.params.recipeid) })
      }
    ]
  },
  {
    path: '/editrecipe',
    name: 'EditRecipe',
    component: () => import('../views/EditRecipeView.vue'),
    children: [
      {
        path: ':editrecipeid',
        name: 'editrecipeById',
        component: () => import('../views/EditRecipeView.vue'),
        props: (route) => ({ id: parseInt(route.params.editrecipeid) })
      }
    ]
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/CategoriesView.vue'),
    children: [
      {
        path: ':categoryId',
        name: 'categoryById',
        component: () => import('../views/CategoriesView.vue'),
        props: (route) => ({ id: parseInt(route.params.categoryId) })
      }
    ]
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('../views/TagsView.vue'),
    children: [
      {
        path: ':tagId',
        name: 'tagsIds',
        component: () => import('../views/TagsView.vue'),
        props: (route) => ({ id: parseInt(route.params.tagId) })
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

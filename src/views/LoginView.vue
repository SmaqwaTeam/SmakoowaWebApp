<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/UserStore'

export default {
  data () {
    return {
      login: null,
      password: null
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      logUser: 'loginUser'
    }),
    loginUser () {
      const payload = { login: this.login, password: this.password }
      try {
        this.logUser(payload)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<template>
  <div class="container mx-auto py-4">
    <h1 class="text-2xl text-center">Login</h1>
    <form class="w-full max-w-sm">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Login
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="login"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="password"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password"
            type="password"
            placeholder="*****"
          />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            @click="loginUser"
            class="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/UserStore'
export default {
  data () {
    return {
      login: null,
      email: null,
      password: null,
      confpassword: null
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      regUser: 'registerUser'
    }),
    registerUser () {
      if (this.password === this.confpassword) {
        const payload = {
          userlogin: this.login,
          useremail: this.email,
          userpassword: this.password
        }
        this.regUser(payload)
      } else {
        alert('Passwords are not equal. Try again')
      }
    }
  }
}
</script>
<template>
  <div class="container mx-auto py-4">
    <h1 class="text-2xl text-center">Register</h1>
    <form class="w-full max-w-sm">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Your Login
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="login"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-login"
            type="text"
            placeholder="Your name"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="email"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-email"
            type="text"
            placeholder="abc@example.com"
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
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Confirm Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="confpassword"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-cofirm-password"
            type="password"
            placeholder="*****"
          />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            @click="registerUser"
            class="shadow bg-orange-200 hover:bg-orange-400 border-2 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

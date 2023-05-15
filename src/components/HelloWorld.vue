<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <div class="grid grid-cols-5 gap-2">
    <div class="bg-indigo-50 aspect-square"></div>
    <div class="bg-indigo-100 aspect-square"></div>
    <div class="bg-indigo-200 aspect-square"></div>
    <div class="bg-indigo-300 aspect-square"></div>
    <div class="bg-indigo-400 aspect-square"></div>
    <div class="bg-indigo-500 aspect-square"></div>
    <div class="bg-indigo-600 aspect-square"></div>
    <div class="bg-indigo-700 aspect-square"></div>
    <div class="bg-indigo-800 aspect-square"></div>
    <div class="bg-indigo-900 aspect-square"></div>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

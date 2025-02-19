<template>
    <header class="border-b border-gray-200 bg-primary/5">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="text-gray-800 hover:text-gray-600 transition-colors" aria-label="Go to home page">
          <HomeIcon class="w-6 h-6" />
        </a>
        
        <h1 class="text-base font-medium text-gray-800">Base Camas Medellín</h1>
        
        <button
          @click="emit('openCart')"
          class="relative text-gray-800 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1 cursor-pointer"
          aria-label="Go to cart"
        >
          <ShoppingCartIcon class="w-6 h-6" />
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold bg-red-500 text-white rounded-full"
          >
            {{ cartItemCount }}
          </span>
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import { defineEmits, onMounted, ref } from 'vue'
  import { HomeIcon, ShoppingCartIcon } from 'lucide-vue-next'

  const emit = defineEmits(['openCart'])

  const cartItemCount = ref(0)

  onMounted(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    cartItemCount.value = cart.length
  })
  </script>
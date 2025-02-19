<template>
  <div>
    <h2 class="sr-only">Steps</h2>
    <div
      class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-emerald-100"
    >
      <ol
        class="relative z-10 flex justify-between text-sm font-medium text-gray-500"
      >
        <li
          class="flex items-center gap-2 bg-white p-2"
          :class="{ 'bg-emerald-600': currentStep >= 1 }"
        >
          <span
            class="size-6 rounded-full text-center text-[10px]/6 font-bold"
            :class="{ 'bg-emerald-600 text-white': currentStep >= 1, 'bg-gray-100': currentStep < 1 }"
          >
            1
          </span>
          <span class="hidden sm:block"> Details </span>
        </li>

        <li
          class="flex items-center gap-2 bg-white p-2"
          :class="{ 'bg-emerald-600': currentStep >= 2 }"
        >
          <span
            class="size-6 rounded-full text-center text-[10px]/6 font-bold"
            :class="{ 'bg-emerald-600 text-white': currentStep >= 2, 'bg-gray-100': currentStep < 2 }"
          >
            2
          </span>
          <span class="hidden sm:block"> Address </span>
        </li>

        <li
          class="flex items-center gap-2 bg-white p-2"
          :class="{ 'bg-emerald-600': currentStep >= 3 }"
        >
          <span
            class="size-6 rounded-full text-center text-[10px]/6 font-bold"
            :class="{ 'bg-emerald-600 text-white': currentStep >= 3, 'bg-gray-100': currentStep < 3 }"
          >
            3
          </span>
          <span class="hidden sm:block"> Payment </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  }
});
</script>
<template>
  <section class="py-12">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header>
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Otros Productos</h2>
      </header>

      <div class="mt-8 relative">
        <!-- Botones de navegación - solo visibles en sm y superiores -->
        <button 
          @click="prev" 
          class="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button 
          @click="next"
          class="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <!-- Contenedor del carousel -->
        <div class="overflow-x-auto sm:overflow-hidden">
          <ul class="flex gap-4 transition-transform duration-300 ease-in-out snap-x snap-mandatory sm:snap-none"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }">

              <li v-if="props.category !== 'base-individual'" class="flex-none w-[300px] snap-start">
              <a href="/00-base-individual" class="group block overflow-hidden">
                <img
                  src="/images/00-base-negra.jpeg"
                  alt=""
                  class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
      
                <div class="relative bg-white pt-3">
                  <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    Base Cama Individual
                  </h3>
                  <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      Tiempo de Entrega: Inmediata
                    </h3>
      
                  <p class="mt-2">
                      <span class="sr-only"> Price </span>
                      <div class="flex items-center gap-2">
                        <span class="text-xs line-through text-gray-500">
                        $120000
                        </span>
                        <span class="tracking-wider text-red-600 font-semibold">
                        $90000
                        </span>
                        <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                        25% OFF
                        </span>
                      </div>
                    </p>
                </div>
              </a>
            </li>

            <li v-if="props.category !== 'modular'" class="flex-none w-[300px] snap-start">
              <a href="/02-modular" class="group block overflow-hidden">
                <img
                  src="/images/05-modular-negra.png"
                  alt=""
                  class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
      
                <div class="relative bg-white pt-3">
                  <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    Base Cama Modular
                  </h3>
                    <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      Tiempo de Entrega: de 1 a 3 días
                    </h3>

                    <p class="mt-2">
                      <span class="sr-only"> Price </span>
                      <div class="flex items-center gap-2">
                        <span class="text-xs line-through text-gray-500">
                        $150000
                        </span>
                        <span class="tracking-wider text-red-600 font-semibold">
                        $120000
                        </span>
                        <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                        20% OFF
                        </span>
                      </div>
                    </p>
                  </div>
              </a>
            </li>

            <li v-if="props.category !== 'base'" class="flex-none w-[300px] snap-start">
              <a href="/01-base" class="group block overflow-hidden">
                <img
                  src="/images/00-base-negra.jpeg"
                  alt=""
                  class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
      
                <div class="relative bg-white pt-3">
                  <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    Base Cama
                  </h3>
                  <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      Tiempo de Entrega: de 1 a 3 días
                    </h3>
      
                  <p class="mt-2">
                      <span class="sr-only"> Price </span>
                      <div class="flex items-center gap-2">
                        <span class="tracking-wider text-gray-900">
                        $110000
                      </span>
                      </div>
                    </p>
                </div>
              </a>
            </li>

            <li v-if="props.category !== 'modular-sobremedida'" class="flex-none w-[300px] snap-start">
              <a href="/03-modular-sobremedida" class="group block overflow-hidden">
                <img
                  src="/images/10-sobremedida-negra.png"
                  alt=""
                  class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
      
                <div class="relative bg-white pt-3">
                  <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    Base Cama Queen | King
                  </h3>
                  <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      Tiempo de Entrega: de 1 a 4 días
                    </h3>
      
                  <p class="mt-2">
                      <span class="sr-only"> Price </span>
                      <div class="flex items-center gap-2">
                        <span class="tracking-wider text-gray-900">
                        $180000
                      </span>
                      </div>
                    </p>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!-- Indicadores de posición - solo visibles en sm y superiores -->
        <div class="hidden sm:flex justify-center gap-2 mt-4">
          <button 
            v-for="index in 1" 
            :key="index"
            @click="goToSlide(index - 1)"
            :class="[
              'w-2 h-2 rounded-full',
              currentSlide === index - 1 ? 'bg-gray-800' : 'bg-gray-300'
            ]"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    category: String,
});

const currentSlide = ref(0);
const totalSlides = 5;

const next = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides;
};

const prev = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
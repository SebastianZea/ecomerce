<template>
  <Header  @openCart="openCart" />
  <div class="max-w-7xl mx-auto p-4 md:p-8 text-xs">
    <a
      href="/"
      class="inline-block text-gray-500 underline underline-offset-4 transition hover:text-gray-600 cursor-pointer"
    >
      <div class="flex gap-2 items-center">
        <MoveLeft class="w-4" />
        <p>Seguir comprando</p>
      </div>
    </a>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="relative aspect-square">
        <img
          :src="currentImage.url"
          :alt="props.product.data.name"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div class="space-y-2">
        <h1 class="text-xl font-bold text-gray-900">
          {{ props.product.data.name }}
        </h1>

        <div class="flex items-center gap-2">
          <span
            class="line-through text-gray-500"
            v-if="props.product.data.discount"
            >110.000 COP.</span
          >
          <span
            class="text-lg font-bold text-red-500"
            v-if="props.product.data.discount"
            >{{ props.product.data.price }} COP.</span
          >
          <span class="text-lg font-bold text-primary/75" v-else
            >{{ props.product.data.price }} COP.</span
          >
        </div>

        <div class="flex flex-col items-start gap-2 mb-4">
          <span class="text-sm text-gray-700 flex gap-1">
            <p>Color:</p> 
            <p class="flex gap-1">
              {{ selectedColor.name }} 
              <MoveRight class="w-4" />
              {{ selectedColor.colorPrice.toLocaleString() }} <p v-if="selectedColor.colorPrice !== 'Gratuito'">COP.</p>
            </p>
          </span>
          <div class="space-x-2">
            <button
              v-for="(color, index) in props.product.data.colors"
              :key="index"
              :class="[
                'w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200 cursor-pointer',
                selectedColor.name === color.name
                  ? 'border-primary ring-2 ring-primary/80'
                  : 'border-gray-200 hover:border-gray-300',
              ]"
              @click="handleColorSelect(color)"
            >
              <img
                :src="color.url"
                :alt="props.product.data.name"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
          <button
            v-for="(size, index) in props.product.data.sizes"
            :key="index"
            :class="[
              'group relative inline-block text-sm font-medium focus:outline-hidden cursor-pointer transition-colors duration-300',
              selectedSize === size
                ? 'text-secondary bg-primary'
                : 'text-primary',
            ]"
            @click="handleSizeSelect(size)"
          >
            <span
              class="absolute inset-0 border transition-colors duration-200"
              :class="
                selectedSize === size ? 'border-primary' : 'border-current'
              "
            ></span>
            <span
              :class="[
                'block border px-4 sm:px-8 py-2 group-hover:-translate-x-1 group-hover:-translate-y-1',
                selectedSize === size
                  ? 'bg-gray-300 text-black border-primary'
                  : 'bg-white border-current',
              ]"
            >
              <p class="text-xs">{{ size }}</p>
            </span>
          </button>
        </div>

        <button
          @click="handleBuy"
          class="bg-black text-white px-8 py-4 mt-2 text-sm font-bold rounded w-full hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Agregar al carrito
        </button>

        <p class="text-gray-600 mt-4">
          {{ props.product.data.description }}
        </p>

        <ul class="space-y-2 mt-6">
          <li
            v-for="(feature, index) in props.product.data.features"
            :key="index"
            class="flex gap-2"
          >
            <div class="w-2 h-2 rounded-full bg-gray-300 mt-1"></div>
            <span class="text-gray-700">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
    <Carousel :category="props.product.data.category" />
  </div>

  <div
    v-if="isCartOpen"
    class="fixed inset-0 bg-black/85 bg-opacity-50 z-40"
    @click="isCartOpen = false"
  ></div>

  <div
    :class="[
      'fixed right-0 top-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50',
      'w-full md:w-96 lg:w-96',
      isCartOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <Cart v-if="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "./Header.vue";
import Cart from "./Cart.vue";
import Carousel from "./Carousel.vue";
import { MoveLeft, MoveRight } from "lucide-vue-next";

const props = defineProps({
  product: Object,
});

const isCartOpen = ref(false);
const selectedSize = ref(props.product.data.sizes[0]);
const selectedColor = ref(props.product.data.colors[0]);
const price = props.product.data.price
const quantity = 1

const currentImage = computed(() => selectedColor.value);

const handleBuy = () => {
  const cartItem = {
    name: props.product.data.name,
    singularPrice: price,
    totalPrice: price*quantity,
    image: selectedColor.value.url,
    stimedTime: props.product.data.stimedTime,
    hex: selectedColor.value.hex,
    selectedSize: selectedSize.value,
    selectedColor: selectedColor.value.name,
    quantity: quantity,
    id: `client-${props.product.data.category.toLowerCase()}-${Date.now()}`,
  };

  productToCart(cartItem);

  isCartOpen.value = true;
};

const openCart = () => {
  isCartOpen.value = true;
}

const closeCart = () => {
  isCartOpen.value = false;
}

const productToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const handleSizeSelect = (size) => {
  selectedSize.value = size;
};

const handleColorSelect = (color) => {
  selectedColor.value = color;
};
</script>

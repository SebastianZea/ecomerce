<template>
  <div
    v-if="cart.length === 0"
    class="fixed inset-0 grid place-content-center bg-white px-4 sm:px-6 lg:px-8"
  >
    <div class="text-center">
      <h1
        class="text-xl sm:text-2xl tracking-widest text-gray-500 uppercase mb-4"
      >
        Tu carrito está vacío
      </h1>
      <button
        @click="$emit('close')"
        class="inline-block text-sm text-primary transition hover:bg-text-600 hover:font-semibold mt-32 cursor-pointer"
      >
        <p class="flex items-center gap-2">
          <MoveLeft class="w-4 h-4 mr-2 text-black" />
          <span>Volver a la tienda</span>
        </p>
      </button>
    </div>
  </div>

  <div
    v-else
    class="relative w-screen min-h-screen md:max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 text-xs"
    aria-modal="true"
    role="dialog"
    tabindex="-1"
  >
    <button
      @click="$emit('close')"
      class="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
    >
      <span class="sr-only">Close cart</span>

      <X class="size-4" />
    </button>

    <div class="mt-4 flex flex-col justify-between">
      <ul class="space-y-4 max-h-[470px] overflow-y-auto">
        <li
          v-for="(item, index) in cart"
          :key="index"
          class="flex items-center gap-4"
        >
          <img
            :src="item.image"
            alt=""
            class="size-16 rounded-sm object-cover"
          />
            <div>
              <h3 class="text-sm text-gray-900">{{ item.name }}</h3>
              <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                  <dt class="inline">Medida:</dt>
                  <dd class="inline">{{ item.selectedSize }}</dd>
                </div>
                <div class="flex items-center gap-1">
                  <dt class="inline">Color:</dt>
                  <dd>
                    <pre>{{ item.selectedColor }}</pre>
                  </dd>
                </div>
              </dl>
            </div>

            <div class="flex flex-1 items-center justify-end gap-2">
              <form>
                <label :for="'Line' + index + 'Qty'" class="sr-only">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  :value="item.quantity"
                  :id="'Line' + index + 'Qty'"
                  class="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                  @input="updateQuantity(index, $event.target.value)"
                />
              </form>
              <button
                class="text-gray-600 transition hover:text-red-600"
                @click="removeItem(index)"
              >
                <span class="sr-only">Remove item</span>
                <Trash2 class="size-4" />
              </button>
            </div>


        </li>
      </ul>

      <div class="space-y-4 text-center fixed bottom-0 left-0 right-0 py-10 px-4">
        <a
          href="/checkout"
          class="block rounded-sm bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-800"
        >
          Solicitar
        </a>

        <button
          @click="$emit('close')"
          class="inline-block text-gray-500 underline underline-offset-4 transition hover:text-gray-600 cursor-pointer"
        >
        <div class="flex gap-2 items-center">
          <MoveLeft class="w-4" />
          <p>Seguir comprando</p>
        </div>
    </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { MoveLeft, X, Trash2 } from "lucide-vue-next";

const cart = ref([]);

const loadCart = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
};

const updateQuantity = (index, quantity) => {
  const item = cart.value[index]
  item.quantity = quantity
  item.totalPrice = item.singularPrice * item.quantity

  saveCart();
};

const removeItem = (index) => {
  cart.value.splice(index, 1);
  saveCart();
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

onMounted(() => {
  loadCart();
});
</script>

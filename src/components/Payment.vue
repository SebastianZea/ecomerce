<script setup>
import { onMounted, ref, computed, defineEmits } from "vue";
import confetti from "canvas-confetti";
import { Sparkles, Truck, Store, MoveRight } from "lucide-vue-next";

const emit = defineEmits(["next", "prev"]);

const cart = ref(null);
const formStep1 = ref(null);
const formStep2 = ref(null);
const isDataLoaded = ref(false);

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("cart"));
  formStep1.value = JSON.parse(localStorage.getItem("form-step1"));
  formStep2.value = JSON.parse(localStorage.getItem("form-step2"));
  isDataLoaded.value = !!(cart.value && formStep1.value && formStep2.value);
});

const totalPrice = computed(() => {
  if (!cart.value || !formStep2.value) return 0;
  const itemsTotal = cart.value.reduce(
    (sum, item) => sum + Number(item.totalPrice),
    0
  );
  if (formStep2.value.selectedShipping.id !== "reserve-in-stock") {
    return (
      itemsTotal +
      Number(formStep2.value.selectedShipping.extraPrice || 0) +
      formStep1.value.delivery_price
    );
  }
  return itemsTotal + Number(formStep2.value.selectedShipping.extraPrice || 0);
});

const finalizeOrder = () => {
  console.log("Cart:", cart.value);
  console.log("Form Step 1:", formStep1.value);
  console.log("Form Step 2:", formStep2.value);
  console.log("Total:", totalPrice.value);

  emit("next");
  confetti();
};
</script>

<template>
  <div v-if="isDataLoaded" class="flow-root">
    <div class="py-4 font-bold text-sm">
      <h3>Resumen de tu pedido</h3>
    </div>
    <dl class="-my-3 divide-y divide-gray-100 text-xs">
      <div
        class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-medium text-gray-900">Nombre</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {{ formStep1.name }}
        </dd>
      </div>

      <div
        class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-medium text-gray-900">Teléfono</dt>
        <dd class="text-gray-700 sm:col-span-2">{{ formStep1.phone }}</dd>
      </div>

      <div
        class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-medium text-gray-900">Dirección</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {{ formStep1.address }} | {{ formStep1.neighborhood }}
        </dd>
      </div>

      <div
        class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-medium text-gray-900">Municipio</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {{ formStep1.municipality }} - {{ formStep1.city }}
        </dd>
      </div>

      <div
        class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-medium text-gray-900">Entrega</dt>
        <dd class="text-gray-700 sm:col-span-2">
          <span
            v-if="formStep2.selectedShipping.id === 'normal-shipping'"
            class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
          >
            <Truck class="w-4 h-4 mr-2" />

            <p class="text-xs whitespace-nowrap">Domicilio</p>
          </span>

          <span
            v-if="formStep2.selectedShipping.id === 'express-shipping'"
            class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700"
          >
            <Sparkles class="w-4 h-4 mr-2" />
            <p class="text-xs whitespace-nowrap">Express</p>
          </span>

          <span
            v-if="formStep2.selectedShipping.id === 'reserve-in-stock'"
            class="inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700"
          >
            <Store class="w-4 h-4 mr-2" />

            <p class="text-xs whitespace-nowrap">Almacén</p>
          </span>
        </dd>
      </div>

      <div
        class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-medium text-gray-900">Precio Total</dt>
        <dd class="text-gray-700 sm:col-span-2">
          ${{ totalPrice.toLocaleString() }} COP.
        </dd>
      </div>

      <div
        class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-medium text-gray-900">Pedido</dt>
        <dd class="text-gray-700 sm:col-span-2">
          <ul class="divide-y divide-gray-200">
            <li v-for="item in cart" :key="item.id" class="py-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img
                    :src="item.image"
                    alt=""
                    class="w-8 h-8 rounded-sm object-cover"
                  />
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">
                      {{ item.name }} x{{ item.quantity }}
                    </h4>
                    <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt class="inline mr-1">Talla:</dt>
                        <dd class="inline">
                          {{ item.selectedSize }} | ${{ item.totalPrice }} COP.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img
                    v-if="formStep2.selectedShipping.id === 'normal-shipping'"
                    src="/images/delivery-normal.png"
                    alt="delivery"
                    class="w-8 h-8 rounded-sm object-cover"
                  />
                  <img
                    v-if="formStep2.selectedShipping.id === 'express-shipping'"
                    src="/images/delivery-express.png"
                    alt="delivery"
                    class="w-8 h-8 rounded-sm object-cover"
                  />
                  <img
                    v-if="formStep2.selectedShipping.id === 'reserve-in-stock'"
                    src="/images/delivery-reserve-in-stock.png"
                    alt="delivery"
                    class="w-8 h-8 rounded-sm object-cover"
                  />
                  <div>
                    <h4
                      v-if="formStep2.selectedShipping.id === 'normal-shipping'"
                      class="text-sm font-medium text-gray-900"
                    >
                      <div class="flex gap-2 items-center">
                        <p>Domicilio</p>
                        <MoveRight class="w-4" />
                        <p>{{ formStep1.municipality }}</p>
                      </div>
                    </h4>
                    <h4
                      v-if="
                        formStep2.selectedShipping.id === 'express-shipping'
                      "
                      class="text-sm font-medium text-gray-900"
                    >
                      <div class="flex gap-2 items-center">
                        <p>Domicilio Express</p>
                        <MoveRight class="w-4" />
                        <p>{{ formStep1.municipality }}</p>
                      </div>
                    </h4>
                    <h4
                      v-if="
                        formStep2.selectedShipping.id === 'reserve-in-stock'
                      "
                      class="text-sm font-medium text-gray-900"
                    >
                    <div class="flex gap-2 items-center">
                        <p>Reservar en almacén</p>
                        <MoveRight class="w-4" />
                        <p>Copacabana</p>
                      </div>
                    </h4>
                    <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt class="inline mr-1">Tiempo estimado:</dt>
                        <dd
                          v-if="
                            formStep2.selectedShipping.id !== 'reserve-in-stock'
                          "
                          class="inline"
                        >
                          {{ formStep2.selectedShipping.stimedTime }} | ${{
                            formStep1.delivery_price +
                            formStep2.selectedShipping.extraPrice
                          }}
                          COP.
                        </dd>
                        <dd v-else class="inline">
                          {{ formStep2.selectedShipping.stimedTime }} | Gratuito | Calle 50 #59-132.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
    <button
      @click="finalizeOrder"
      class="w-full rounded px-5 py-3 mt-6 text-sm font-medium border cursor-pointer transition-colors bg-emerald-600 text-white hover:bg-emerald-800"
    >
      <div class="flex items-center justify-center gap-2">
        <p class="text-xs">Finalizar</p>
        <MoveRight class="size-4 text-white" />
      </div>
      <p class="text-xs text-white/80">{{ totalPrice.toLocaleString() }} COP.</p>
    </button>
    <button
      @click="$emit('prev')"
      class="w-full rounded px-5 py-3 mt-2 text-sm font-medium border cursor-pointer transition-colors bg-primary/50 text-white hover:bg-primary/80"
    >
      <p class="text-xs">Volver</p>
    </button>
  </div>
  <div v-else></div>
</template>

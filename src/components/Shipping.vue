<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { MapPin, MoveRight } from "lucide-vue-next";

const formStep1 = ref({});

const emit = defineEmits(["next", "prev"]);

onMounted(() => {
  const storedData = localStorage.getItem("form-step1");
  if (storedData) {
    formStep1.value = JSON.parse(storedData);
  }
});

const shippingOptions = [
  {
    id: "normal-shipping",
    title: "Enviar a Domicilio",
    delivery: "Entrega garantizada de 1 a 4 día(s).",
    extraPrice: 0,
    stimedTime: "1 - 4 días",
  },
  {
    id: "express-shipping",
    title: "Enviar Domicilio Express",
    delivery: "Entrega garantizada de 0 a 1 día.",
    extraPrice: 20000,
    stimedTime: "0 - 1 día",
  },
  {
    id: "reserve-in-stock",
    title: "Recoger en Almacén",
    delivery: "Reservar en Copacabana Calle 50 #59-132",
    extraPrice: 0,
    stimedTime: "Inmediato",
  },
];

const saveStep2 = () => {
  localStorage.setItem(
    "form-step2",
    JSON.stringify({ selectedShipping: selectedShipping.value })
  );
  emit("next");
};

const selectedShipping = ref(shippingOptions[0]);
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <p class="text-gray-600 mb-2 text-sm">Enviar a:</p>
      <div class="flex items-start gap-2">
        <MapPin class="w-5 h-5 text-gray-400 mt-0.5" />
        <span class="text-gray-900 text-xs italic"
          >{{ formStep1.address }}, {{ formStep1.neighborhood }},
          {{ formStep1.municipality }}</span
        >
      </div>
    </div>

    <div class="space-y-3">
      <div
        v-for="option in shippingOptions"
        :key="option.id"
        class="border rounded p-4 cursor-pointer"
        :class="{
          'border-blue-600 bg-blue-50': selectedShipping.id === option.id,
          'border-gray-200': selectedShipping.id !== option.id,
        }"
        @click="selectedShipping = option"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-5 h-5 rounded-full border flex items-center justify-center"
              :class="{
                'border-blue-600': selectedShipping.id === option.id,
                'border-gray-300': selectedShipping.id !== option.id,
              }"
            >
              <div
                v-if="selectedShipping.id === option.id"
                class="w-2.5 h-2.5 rounded-full bg-blue-600"
              ></div>
            </div>
            <div>
              <h3 class="font-medium text-sm">{{ option.title }}</h3>
              <p class="text-xs text-gray-500">
                {{ option.delivery }}<br />
                <span v-if="option.id === 'normal-shipping'" class="font-medium"
                  >${{ formStep1.delivery_price }} COP</span
                >
                <span
                  v-else-if="option.id === 'express-shipping'"
                  class="font-medium"
                  >${{ formStep1.delivery_price + option.extraPrice }} COP</span
                >
                <span v-else class="font-medium"
                  >Gratuito</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="max-w-2xl mx-auto mt-6">
    <button
      @click="saveStep2"
      class="w-full rounded px-5 py-3 mt-6 text-sm font-medium border cursor-pointer transition-colors bg-emerald-600 text-white hover:bg-emerald-800"
    >
      <div class="flex items-center justify-center gap-2">
        <p class="text-xs">Continuar</p>
        <MoveRight class="size-4 text-white" />
      </div>
    </button>
    <button
      @click="$emit('prev')"
      class="w-full rounded px-5 py-3 text-sm font-medium border cursor-pointer transition-colors bg-primary/50 text-white hover:bg-primary/80"
    >
      <p class="text-xs">Volver</p>
    </button>
  </div>
</template>

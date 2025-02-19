<script setup>
import {
  Lock,
  User,
  Phone,
  MapPin,
  Building2,
  MapPinHouse,
  MoveRight,
  MoveLeft,
} from "lucide-vue-next";
import { ref, computed, defineEmits, onMounted } from 'vue';

const emit = defineEmits(['next']);

const name = ref('');
const phone = ref('');
const address = ref('');
const neighborhood = ref('');
const municipality = ref('Medellín');
const city = ref('Área Metropolitana');
const state = ref('Antioquia');

onMounted(() => {
  const storedData = localStorage.getItem('form-step1');
  if (storedData) {
    const formData = JSON.parse(storedData);
    name.value = formData.name;
    phone.value = formData.phone;
    address.value = formData.address;
    neighborhood.value = formData.neighborhood;
    municipality.value = formData.municipality;
    city.value = formData.city;
    state.value = formData.state;
  }
});

const isFormValid = computed(() => {
  return name.value && phone.value && address.value && neighborhood.value && municipality.value;
});

const municipalityPrices = {
  "Medellín": 30000,
  "Envigado": 40000,
  "Sabaneta": 30000,
  "Itagüí": 40000,
  "Bello": 30000,
  "La Estrella": 40000,
  "Caldas": 50000,
  "Copacabana": 20000,
  "Girardota": 30000,
  "Barbosa": 50000
};

const submitStep1 = () => {
  emit('next');
  const formData = {
    name: name.value,
    phone: phone.value,
    address: address.value,
    neighborhood: neighborhood.value,
    municipality: municipality.value,
    delivery_price: municipalityPrices[municipality.value] || 0,
    city: city.value,
    state: state.value
  };
  localStorage.setItem('form-step1', JSON.stringify(formData));
};

</script>

<template>
    <form action="#" class="mx-auto mt-8 mb-0 max-w-md space-y-2 text-xs">
      <div>
        <label for="name" class="text-black/40">Nombre</label>

        <div class="relative">
          <input
            type="text"
            id="name"
            class="w-full rounded border border-gray-200 p-2.5 pe-12 shadow-xs"
            v-model="name"
            required
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <User class="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <div>
        <label for="phone" class="text-black/40">Teléfono (999-999-9999)</label>

        <div class="relative">
          <input
            type="tel"
            id="phone"
            class="w-full rounded border border-gray-200 p-2.5 pe-12 shadow-xs"
            v-model="phone"
            required
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <Phone class="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <div>
        <label for="address" class="text-black/40">Dirección</label>

        <div class="relative">
          <input
            type="text"
            id="address"
            class="w-full rounded border border-gray-200 p-2.5 pe-12 shadow-xs"
            v-model="address"
            required
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <MapPin class="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <div>
        <label for="neighborhood" class="text-black/40">Barrio</label>

        <div class="relative">
          <input
            type="text"
            id="neighborhood"
            class="w-full rounded border border-gray-200 p-2.5 pe-12 shadow-xs"
            v-model="neighborhood"
            required
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <MapPinHouse class="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <div>
        <label for="municipality" class="text-black/40">Municipio</label>

        <div class="relative">
          <select
            id="municipality"
            class="w-full rounded border border-gray-200 p-2.5 pe-12 shadow-xs"
            v-model="municipality"
            required
          >
            <option value="">Seleccione un municipio</option>
            <option value="Medellín">Medellín</option>
            <option value="Envigado">Envigado</option>
            <option value="Sabaneta">Sabaneta</option>
            <option value="Itagüí">Itagüí</option>
            <option value="Bello">Bello</option>
            <option value="La Estrella">La Estrella</option>
            <option value="Caldas">Caldas</option>
            <option value="Copacabana">Copacabana</option>
            <option value="Girardota">Girardota</option>
            <option value="Barbosa">Barbosa</option>
          </select>

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <Building2 class="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <div>
        <label for="city" class="text-black/40">Disponibilidad</label>

        <div class="relative">
          <input
            type="text"
            id="city"
            class="w-full rounded border border-gray-200 p-2.5 pe-12 shadow-xs bg-gray-100 cursor-not-allowed"
            v-model="city"
            disabled
            placeholder="Área Metropolitana"
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <Building2 class="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <div>
        <label for="state" class="text-black/40">Departamento</label>

        <div class="relative">
          <input
            type="text"
            id="state"
            class="w-full rounded border border-gray-200 p-2.5 pe-12 shadow-xs bg-gray-100 cursor-not-allowed"
            v-model="state"
            disabled
            placeholder="Antioquia"
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <Lock class="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <button
        type="submit"
        @click="submitStep1"
        class="w-full rounded px-5 py-3 mt-6 text-sm font-medium border cursor-pointer transition-colors bg-emerald-600 text-white hover:bg-emerald-800"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed hover:cursor-not-allowed hover:bg-gray-200 hover:text-gray-400 hover:border-gray-200' : ''"
      >
        <div class="flex items-center justify-center gap-2">
          <p>Continuar con el envío</p>
          <MoveRight class="size-4 text-white" />
        </div>
      </button>
      <a
      href="/"
      class="inline-block text-gray-500 underline underline-offset-4 transition hover:text-gray-600 cursor-pointer"
    >
      <div class="flex gap-2 items-center">
        <MoveLeft class="w-4" />
        <p>Seguir comprando</p>
      </div>
    </a>
    </form>
</template>
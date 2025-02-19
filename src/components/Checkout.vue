<template>
  <div class="max-w-2xl mx-auto p-6 text-xs min-h-[80vh]">
    <Steps :currentStep="currentStep" />

    <Form v-if="currentStep === 0" @next="nextStep" />

    <Shipping v-if="currentStep === 1" @next="nextStep" @prev="previousStep" />

    <Payment v-if="currentStep === 2" @next="nextStep" @prev="previousStep" />

    <div v-if="currentStep === 3" class="text-center py-8">
      <div
        class="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center"
      >
        <ThumbsUpIcon class="w-10 h-10 text-emerald-600" />
      </div>
      <h2 class="text-base font-semibold mb-2">¡Datos guardados correctamente!</h2>
      <p class="text-gray-600">
        Contáctate por WhatsApp para completar la solicitud de tu pedido. ¡Recuerda que el pago
        es contra entrega!.
      </p>

      <button
        class="w-full rounded px-5 py-3 mt-6 font-medium border cursor-pointer transition-colors bg-emerald-600 text-white hover:bg-emerald-800"
      >
        <div class="flex items-center justify-center gap-2">
          <p>Hablar a WhatsApp</p>
          <PhoneOutgoing class="size-4 text-white" />
        </div>
      </button>
      <button
        @click="returnToStore"
      class="w-full rounded px-5 py-3 mt-2 font-medium border cursor-pointer transition-colors text-black"
    >
      Volver
    </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Form from "./Form.vue";
import Shipping from "./Shipping.vue";
import Payment from "./Payment.vue";
import Steps from "./Steps.vue";
import { ThumbsUpIcon, PhoneOutgoing } from "lucide-vue-next";

const currentStep = ref(0);

onMounted(() => {
  const storedStep = localStorage.getItem("currentStep");
  if (storedStep) {
    currentStep.value = parseInt(storedStep, 10);
  }
});

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
    localStorage.setItem("currentStep", currentStep.value);
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    localStorage.setItem("currentStep", currentStep.value);
  }
};

const returnToStore = () => {
  localStorage.removeItem("currentStep");
  localStorage.removeItem("cart");
  localStorage.removeItem("form-step1");
  localStorage.removeItem("form-step2");
  currentStep.value = 0;
  window.location.href = "/";
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

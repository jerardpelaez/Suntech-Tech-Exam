<template>
  <v-btn variant="outlined" class="mt-5" @click="handleClick" :disabled="!isDisabled"
    >Next</v-btn
  >
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form';
import { computed } from '@vue/reactivity';

const formStore = useFormStore();

const isDisabled = computed(() => {
  const birthDate = new Date(formStore.form.birthday);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - birthDate.getTime();
  const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365.25);
  const isAbove18 = yearsDiff >= 18;
  return isAbove18;
});

const handleClick = () => {
  // handle click events here
};
</script>

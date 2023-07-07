import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', () => {
  const form = ref({
    first_name: '',
    last_name: '',
    birthday: '',
    email: '',
  })

  return { form }
})

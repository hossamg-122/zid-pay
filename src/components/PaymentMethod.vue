<template>
  <div>
    <StripeElements
      v-if="stripeLoaded"
      v-slot="{ elements }"
      ref="elms"
      :stripe-key="stripeKey"
      :instance-options="instanceOptions"
      :elements-options="elementsOptions"
    >
      <StripeElement
        ref="card"
        :elements="elements"
        :options="cardOptions"
        class="border border-neutrals-100 invalid:border-error rounded p-4"
      />
    </StripeElements>
    <ZBtn type="submit" class="mt-10" :loading="isLoading" @click="addCard">{{
      t('payment.save')
    }}</ZBtn>
  </div>
</template>

<script setup lang="ts">
import { StripeElements, StripeElement } from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ref, onBeforeMount } from 'vue'
import { ZBtn } from './atoms'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useApi } from '@/composables'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const stripeKey = ref(import.meta.env.VITE_VUE_APP_STRIPE_PK)
const { t } = useI18n()
const authStore = useAuthStore()

const isLoading = ref(false)
const instanceOptions = ref({})
const elementsOptions = ref({})
const cardOptions = ref({
  value: {
    postalCode: 19016
  },
  style: {
    base: {
      iconColor: '#7462F4',
      color: '#000000',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#81808c'
      }
    },
    invalid: {
      iconColor: '#f04437',
      color: '#f04437'
    }
  }
})
const stripeLoaded = ref(false)
const card = ref()
const elms = ref()

onBeforeMount(() => {
  const stripePromise = loadStripe(stripeKey.value)
  stripePromise.then(() => {
    stripeLoaded.value = true
  })
})

const addCard = () => {
  isLoading.value = true
  const cardElement = card.value.stripeElement

  elms.value.instance.createToken(cardElement).then(async (result: any) => {
    if (result?.error) {
      toast.error(result.error.message)
    } else if (result?.token && authStore.getUser) {
      const { localId } = authStore.getUser
      try {
        await useApi().post(`/payment-methods/${localId}.json`, result.token.card)
        emit('success')
      } catch (error: any) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message)
        }
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>

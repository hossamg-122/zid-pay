<template>
  <MainLayout>
    <div>
      <div class="mb-5 flex justify-between items-center">
        <h1 class="font-bold text-2xl">{{ t('payment.title') }}</h1>
        <ZBtn :label="t('payment.addCard')" @click="isModalOpen = true" />
      </div>
      <div v-if="isPageReady">
        <template v-if="paymentMethods">
          <PaymentMenuItem
            v-for="{ brand, last4 } in paymentMethods"
            :key="last4"
            class="[&:not(:last-child)]:mb-4"
            :issuer="brand"
            :last-digits="last4"
        /></template>
        <div v-else class="text-sm">{{ t('payment.noMethods') }}</div>
      </div>
      <div v-else class="flex justify-center items-center mt-10">
        <ZLoader />
      </div>
      <ZModal v-if="isModalOpen" @close="isModalOpen = false">
        <ZCard>
          <div class="flex justify-end mb-3">
            <ZIcon name="close" class="cursor-pointer" @click="isModalOpen = false" />
          </div>
          <PaymentMethod @close="isModalOpen = false" @success="fetchPaymentMethods" />
        </ZCard>
      </ZModal>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MainLayout } from '@/layouts'
import { useI18n } from 'vue-i18n'
import { ZModal, PaymentMethod, ZCard, ZIcon, ZLoader, PaymentMenuItem, ZBtn } from '@/components'
import { useApi } from '@/composables'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'

const isPageReady = ref(false)
const isModalOpen = ref(false)
const paymentMethods = ref()
const authStore = useAuthStore()
const { t } = useI18n()

const fetchPaymentMethods = async () => {
  isModalOpen.value = false
  isPageReady.value = false
  try {
    const { data } = await useApi().get(`/payment-methods/${authStore.getUser?.localId}.json`)
    const modifiedData = Object.keys(data).map((id) => ({ referenceId: id, ...data[id] }))
    paymentMethods.value = modifiedData
    isPageReady.value = true
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      toast.error(error.response.data.error.message)
    }
  }
}
onMounted(() => {
  fetchPaymentMethods()
})
</script>

<style scoped>
/* Add any additional styling here if necessary */
</style>

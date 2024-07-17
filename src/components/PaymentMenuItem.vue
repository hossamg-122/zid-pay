<template>
  <div
    class="flex items-center ps-4 pe-1 py-3 rounded-md border border-primary-100 cursor-pointer hover:opacity-50"
  >
    <component :is="paymentCards[issuer] || Placeholder" class="h-6 w-9" />
    <div class="mx-2 text-saved-payment-label">{{ issuer }}</div>
    <div className="flex">
      <div v-for="n in 3" :key="n" class="flex items-center [&:not(:last-child)]:me-2">
        <EllipseGroup />
      </div>

      <div className="text-saved-payment-number">{{ lastDigits }}</div>
    </div>

    <ZIcon name="keyboard_arrow_right" class="text-primary ms-auto" />
  </div>
</template>
<script setup lang="ts">
import { Placeholder, paymentCards, EllipseGroup } from '@/assets/svg'
import { ZIcon } from './atoms'

interface SavedPaymentMenuItemProps {
  issuer: keyof typeof paymentCards
  lastDigits: string
}
defineProps<SavedPaymentMenuItemProps>()
</script>

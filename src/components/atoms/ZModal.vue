<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleEscape = (e: KeyboardEvent) => {
  e.stopPropagation()

  if (e.keyCode === 27) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.body.classList.add('overflow-hidden')
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <transition name="modal" appear>
    <div class="z-50 fixed inset-0 overflow-y-auto modal-mask">
      <div class="modal-container flex justify-center items-center h-full max-w-lg mx-auto">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style>
.modal-mask {
  background: rgba(0, 0, 0, 0.6);
  transition: opacity 0.2s ease;
}

.modal-container {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-active {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>

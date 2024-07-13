<script setup lang="ts">
import { ZIcon, ZLoader, ZBtn, ZInput } from '@/components'
import { computed, reactive } from 'vue'

const form = reactive({ email: 'qwq', password: '' })
const fields = computed(() => [
  {
    key: 'email',

    bindOptions: {
      label: 'Email',
      type: 'email'
    }
  },
  {
    key: 'password',

    bindOptions: {
      label: 'Password',
      type: 'password',
      errors: ['test error']
    }
  }
])
</script>

<template>
  <main>
    <h1 class="text-primary text-center text-3xl">{{ $t('title.config') }}</h1>
    <ZLoader />
    <z-icon name="menu" class="text-success" />

    <form>
      <z-btn label="test" variant="outlined" color="alert" type="submit" class="ml-10" />
      <ZInput
        v-for="{ key, bindOptions } in fields"
        v-bind="bindOptions"
        :key="key"
        v-model="form[key]"
        class="mt-10"
      />
    </form>
  </main>
</template>

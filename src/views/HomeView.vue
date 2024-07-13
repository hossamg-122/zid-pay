<script setup lang="ts">
import { ZIcon, ZLoader, ZBtn } from '@/components'
</script>

<template>
  <main>
    <h1 class="text-primary text-center text-3xl">{{ $t('title.config') }}</h1>
    <ZLoader />
    <z-icon name="menu" class="text-success" />

    <z-btn label="test" variant="outlined" color="alert" type="button" class="ml-10" />
  </main>
</template>

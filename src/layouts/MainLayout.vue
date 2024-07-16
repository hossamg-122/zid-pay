<template>
  <button
    ref="menuBtn"
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-neutral-200focus:outline-none focus:ring-2 focus:ring-gray-200"
    @click="showMobileMenu = true"
  >
    <ZIcon name="menu" />
  </button>

  <aside
    id="default-sidebar"
    ref="sideBar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-primary"
    aria-label="Sidebar"
    :class="{
      'translate-x-0': showMobileMenu
    }"
  >
    <div class="p-4">
      <img class="h-20 flex items-center justify-center" src="@/assets/images/zid-logo.webp" />
    </div>
    <nav class="h-full px-3 py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium text-white">
        <li v-for="{ title, icon, route } in navLinks" :key="title">
          <router-link
            :to="route"
            class="flex items-center p-2 rounded-lg hover:bg-neutral-200 hover:text-primary"
            active-class="bg-neutral-200 text-primary"
          >
            <ZIcon :name="icon" />
            <span class="ms-3">{{ title }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>

  <main class="p-10 sm:ml-64 overflow-hidden">
    <slot />
  </main>
</template>
<script setup lang="ts">
import { ZIcon } from '@/components'
import type { paths } from '@/zIcons'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface INavLinks {
  title: string
  icon: keyof typeof paths
  route: string
}
const { t } = useI18n()

const sideBar = ref(null)
const menuBtn = ref(null)
const showMobileMenu = ref(false)

const navLinks: INavLinks[] = [
  {
    title: t('sideBar.account'),
    icon: 'profile',
    route: '/account'
  },
  {
    title: t('sideBar.payment'),
    icon: 'creditCards',
    route: '/payment'
  }
]
const handleClickOutside = (event: MouseEvent) => {
  if (!showMobileMenu.value) return
  if (
    sideBar.value &&
    !sideBar.value.contains(event.target as Node) &&
    menuBtn.value &&
    !menuBtn.value.contains(event.target as Node)
  ) {
    showMobileMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

watch(showMobileMenu, () => {
  if (showMobileMenu.value) {
    document.body.classList.add('drop-shadow-2xl')
  } else {
    document.body.classList.remove('drop-shadow-2xl')
  }
})
</script>
<style lang=""></style>

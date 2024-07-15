import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import './assets/main.css'

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n())
app.use(Vue3Toasity, {
  autoClose: 3000,
  style: {
    width: 'fit-content'
  }
  // ...
} as ToastContainerOptions)
app.mount('#app')

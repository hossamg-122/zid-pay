<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useAuthStore, type IUser } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { ZBtn, ZCard, ZInput } from '@/components'
import { AuthLayout } from '@/layouts'
import { useI18n } from 'vue-i18n'
import { useApi } from '@/composables'

interface IForm {
  email: string
  password: string
}

const form = reactive<IForm>({ email: '', password: '' })
const loading = ref(false)
const responseErrors = reactive<Record<string, any>>({})
const authStore = useAuthStore()
const router = useRouter()

const { t } = useI18n()

const fields = computed(() => [
  {
    key: 'email',
    bindOptions: {
      label: t('login.form.email'),
      type: 'email'
    }
  },
  {
    key: 'password',
    bindOptions: {
      label: t('login.form.password'),
      type: 'password'
    }
  }
])

const rules = {
  form: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  }
}
const v$ = useVuelidate(rules, { form })

const onSubmit = async () => {
  responseErrors.value = {}
  v$.value.$touch()
  if (v$.value.$invalid) return
  loading.value = true

  try {
    const {
      data: { localId, idToken }
    } = await useApi(false, true).post(
      `/accounts:signInWithPassword?key=${import.meta.env.VITE_VUE_APP_Z_API_KEY}`,
      form
    )

    // get user data
    const {
      data: { email, name, birthDate, gender }
    } = await useApi(true, true).get(`/users/${localId}.json?auth=${idToken}`)

    const userDate: IUser = {
      email,
      name,
      birthDate,
      gender,
      idToken,
      localId
    }
    toast.success(t('login.loggedInMessage'))

    await authStore.loginUser(userDate)
    setTimeout(() => {
      router.push('/account-details')
    }, 1500)
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response?.data?.message)
    }

    Object.assign(responseErrors, error.response?.data?.errors ?? {})
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col w-full items-center">
      <ZCard>
        <h1 class="text-primary-900 text-2xl font-bold">{{ t('login.title') }}</h1>

        <form class="pt-6" @submit.prevent="onSubmit">
          <ZInput
            v-for="{ key, input, bindOptions } in fields"
            v-bind="bindOptions"
            :key="key"
            v-model="form[key]"
            :input="input"
            :errors="v$.$invalid ? v$.form[key].$errors : responseErrors[key]"
          />

          <ZBtn block :loading="loading" :label="t('login.form.button')" type="submit" />
        </form>
      </ZCard>
      <div class="mt-5 text-sm">
        <span> {{ t('login.dontHaveAccount') }}</span>
        <router-link to="/sign-up" class="ms-1 text-secondary leading-7">
          {{ t('login.signUp') }}</router-link
        >
      </div>
    </div>
  </AuthLayout>
</template>

<style lang="scss"></style>

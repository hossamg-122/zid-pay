<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'
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
    input: 'TsInput',
    bindOptions: {
      label: t('login.form.email'),
      type: 'email'
    }
  },
  {
    key: 'password',
    input: 'TsInput',
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
    const { data } = await useApi(false, true).post('/auth/login', form)
    toast.success('You have been logged in successfully')

    await authStore.loginUser(data)
    router.push('/search')
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

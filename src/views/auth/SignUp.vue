<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useAuthStore, type IUser } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { ZBtn, ZCard, ZInput, ZRadio } from '@/components'
import { AuthLayout } from '@/layouts'
import { useI18n } from 'vue-i18n'
import { useApi } from '@/composables'

interface IForm {
  name: string
  email: string
  birthDate: string
  gender: string
  password: string
  confirm_password: string
}

const inputs = {
  ZInput,
  ZRadio
}
const form = reactive<IForm>({
  name: '',
  email: '',
  birthDate: '',
  gender: '',
  password: '',
  confirm_password: ''
})
const loading = ref(false)
const responseErrors = reactive<Record<string, any>>({})
const authStore = useAuthStore()
const router = useRouter()

const { t } = useI18n()

const fields = computed(() => [
  {
    key: 'name',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.name')
    }
  },
  {
    key: 'email',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.email'),
      type: 'email'
    }
  },
  {
    key: 'birthDate',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.dob'),
      type: 'date',
      maxLength: new Date().toLocaleDateString('en-ca')
    }
  },
  {
    key: 'gender',
    input: 'ZRadio',
    bindOptions: {
      label: t('signUp.form.male'),
      name: 'gender',
      type: 'radio',
      value: 'male'
    }
  },
  {
    key: 'gender',
    input: 'ZRadio',
    bindOptions: {
      label: t('signUp.form.female'),
      name: 'gender',
      type: 'radio',
      value: 'female',
      class: 'mb-5'
    }
  },
  {
    key: 'password',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.password'),
      type: 'password'
    }
  },

  {
    key: 'confirm_password',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.confirmPassword'),
      type: 'password'
    }
  }
])

const rules = computed(() => ({
  form: {
    name: { required },
    email: { required, email },
    birthDate: { required },
    gender: { required },
    password: { required, minLength: minLength(6) },
    confirm_password: {
      required,
      sameAs: helpers.withMessage(
        'The verify password must be equal to the password ',
        sameAs(form.password)
      )
    }
  }
}))
const v$ = useVuelidate(rules, { form })

const onSubmit = async () => {
  responseErrors.value = {}
  v$.value.$touch()
  if (v$.value.$invalid) return
  loading.value = true
  const { email, password, name, birthDate, gender } = form
  try {
    // create user account with email and password
    const {
      data: { idToken, localId }
    } = await useApi(false, true).post(
      `/accounts:signUp?key=${import.meta.env.VITE_VUE_APP_Z_API_KEY}`,
      { email, password, returnSecureToken: true }
    )
    await authStore.storeToken(idToken)

    // update the created account with user data
    await useApi(true, true).patch(
      `/users/${localId}.json`,

      { email, name, birthDate, gender }
    )

    toast.success(t('signUp.accountCreated'))
    const userDate: IUser = {
      email,
      name,
      birthDate,
      gender,
      idToken,
      localId
    }
    await authStore.storeUser(userDate)
    setTimeout(() => {
      router.push('/account')
    }, 1500)
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      toast.error(error.response.data.error.message)
    }

    Object.assign(responseErrors, error.response.data.error.errors ?? {})
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col w-full items-center">
      <ZCard>
        <h1 class="text-primary-900 text-2xl font-bold">{{ t('signUp.title') }}</h1>

        <form class="pt-6" @submit.prevent="onSubmit">
          <component
            :is="inputs[input]"
            v-for="{ key, input, bindOptions } in fields"
            v-bind="bindOptions"
            :key="key"
            v-model="form[key]"
            :errors="v$.$invalid ? v$.form[key].$errors : responseErrors[key]"
          />

          <ZBtn block :loading="loading" :label="t('signUp.form.button')" type="submit" />
        </form>
      </ZCard>
      <div class="mt-5 text-sm">
        <span> {{ t('signUp.alreadyHaveAccount') }}</span>
        <router-link to="/login" class="ms-1 text-secondary leading-7">
          {{ t('signUp.logIn') }}</router-link
        >
      </div>
    </div>
  </AuthLayout>
</template>

<style lang="scss"></style>

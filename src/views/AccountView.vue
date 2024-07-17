<script setup lang="ts">
import { MainLayout } from '@/layouts'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type IUser } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { ZLoader, ZBtn, ZInput, ZRadio } from '@/components'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useApi } from '@/composables'
import { toast } from 'vue3-toastify'

interface IForm {
  name: string
  email: string
  birthDate: string
  gender: string
}

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.getUser
const { t } = useI18n()
const isPageReady = ref(false)
const isEditable = ref(false)
const loading = ref(false)
const responseErrors = reactive<Record<string, any>>({})
const inputs = {
  ZInput,
  ZRadio
}
let originalData = {}
let form = reactive<IForm>({
  name: '',
  email: '',
  birthDate: '',
  gender: ''
})

onMounted(() => {
  // it would be better to fetch the user data from the database directly to be async
  // with any changes but this isn't needed at our case

  if (user) {
    const { name, email, gender, birthDate } = user
    form.name = name
    form.email = email
    form.gender = gender
    form.birthDate = birthDate
    originalData = { name, email, gender, birthDate }
    isPageReady.value = true
  } else {
    router.replace('/login')
  }
})

const fields = computed(() => [
  {
    key: 'name',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.name'),
      disabled: !isEditable.value
    }
  },
  {
    key: 'email',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.email'),
      type: 'email',
      disabled: true
    }
  },
  {
    key: 'birthDate',
    input: 'ZInput',
    bindOptions: {
      label: t('signUp.form.dob'),
      type: 'date',
      maxLength: new Date().toLocaleDateString('en-ca'),
      disabled: !isEditable.value
    }
  },
  {
    key: 'gender',
    input: 'ZRadio',
    bindOptions: {
      label: t('signUp.form.male'),
      name: 'gender',
      type: 'radio',
      value: 'male',
      disabled: !isEditable.value
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
      class: 'mb-5',
      disabled: !isEditable.value
    }
  }
])

const rules = computed(() => ({
  form: {
    name: { required },
    email: { required, email },
    birthDate: { required },
    gender: { required }
  }
}))
const v$ = useVuelidate(rules, { form })

const onSubmit = async () => {
  responseErrors.value = {}
  v$.value.$touch()

  if (v$.value.$invalid) return
  loading.value = true

  try {
    // update the created account with user data
    const { data } = await useApi(true, true).patch(`/users/${user?.localId}.json`, form)

    toast.success(t('account.dataUpdated'))

    await authStore.storeUser(data as IUser)
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      toast.error(error.response.data.error.message)
    }

    Object.assign(responseErrors, error.response.data.error.errors ?? {})
  } finally {
    loading.value = false
    isEditable.value = false
  }
}

const handleCancel = () => {
  isEditable.value = false
  form = { ...originalData } as IForm
}
</script>

<template>
  <main>
    <MainLayout>
      <div>
        <div>
          <h1 class="font-bold text-2xl">{{ t('account.title') }}</h1>
        </div>
        <div v-if="isPageReady">
          <form class="pt-6" @submit.prevent="onSubmit">
            <component
              :is="inputs[input]"
              v-for="{ key, input, bindOptions } in fields"
              v-bind="bindOptions"
              :key="key"
              v-model="form[key]"
              :errors="v$.$invalid ? v$.form[key].$errors : responseErrors[key]"
            />
            <div v-if="!isEditable" class="flex items-center justify-end">
              <ZBtn :label="t('account.edit')" @click="isEditable = true" />
            </div>

            <div v-else class="flex flex-col justify-center md:flex-row items-center">
              <ZBtn
                :loading="loading"
                class="grow mb-4 w-full md:w-auto md:me-10 md:mb-0"
                :label="t('account.save')"
                type="submit"
              />
              <ZBtn
                class="grow w-full md:w-auto"
                :label="t('account.cancel')"
                color="neutrals"
                type="reset"
                :disabled="loading"
                @click="handleCancel"
              />
            </div>
          </form>
        </div>
        <div v-else class="flex items-center justify-center mt-40">
          <ZLoader />
        </div>
      </div>
    </MainLayout>
  </main>
</template>

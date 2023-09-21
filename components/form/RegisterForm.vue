<script setup lang="ts">
import { FormError } from '@nuxt/ui/dist/runtime/types'

const supabase = useSupabaseClient()
const toast = useToast()

const state = ref({
  email: '',
  password: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}

const signUpWithOtp = async () => {
  const { error } = await supabase.auth.signUp({
    email: state.value.email,
    password: state.value.password,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm'
    }
  })
  if (error) {
    toast.add({
      title: error.message,
      icon: 'i-heroicons-x-circle-20-solid'
    })
  } else {
    toast.add({
      title: 'Sign up success',
      icon: 'i-heroicons-check-circle'
    })
  }
}

const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/confirm'
    }
  })
  if (error) {
    toast.add({
      title: error.message,
      icon: 'i-heroicons-x-circle-20-solid'
    })
  } else {
    toast.add({
      title: 'Sign in success',
      icon: 'i-heroicons-check-circle'
    })
  }
}
</script>

<template>
  <div class="p-8 shadow-md rounded bg-white dark:bg-neutral-800 w-[400px]">
    <h1 class="text-2xl font-bold">
      Sign Up
    </h1>
    <p class="text-sm text-neutral-600 dark:text-neutral-400">
      to continue to lms-tutorial
    </p>
    <UButton size="md" block icon="i-carbon-logo-github" class="my-4" @click="signInWithGithub">
      Continue with Github
    </UButton>
    <div class="h-0 border-b border-neutral-300 dark:border-neutral-600 my-6" />
    <UForm :state="state" :validate="validate" class="space-y-4" @submit="signUpWithOtp">
      <UFormGroup label="Email Address" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UButton type="submit" block size="md" color="blue">
        Sign Up
      </UButton>
    </UForm>
    <div class="mt-8 text-sm">
      Already have an account?
      <NuxtLink to="/login" class="text-blue-500 cursor-pointer hover:underline">
        Sign In
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>

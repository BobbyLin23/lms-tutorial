<script setup lang="ts">
// @ts-ignore
import type { Course } from '@prisma/client'
import { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const toast = useToast()

const form = ref({
  title: ''
})

const loading = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) { errors.push({ path: 'email', message: 'Required' }) }
  return errors
}

const submit = async (event: FormSubmitEvent<any>) => {
  try {
    loading.value = true
    const { data } = await useFetch<Course>('/api/courses', {
      method: 'POST',
      body: event.data
    })
    navigateTo(`/teacher/courses/${data.value?.id}`)
    toast.add({
      title: 'Course created',
      icon: 'i-heroicons-check-circle'
    })
  } catch (error) {
    toast.add({
      title: 'Something went wrong',
      icon: 'i-heroicons-x-circle-20-solid'
    })
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
    <div>
      <h1 class="text-2xl">
        Name your course
      </h1>
      <p class="text-sm text-slate-600 mb-4">
        What would you like to call your course? Don&apos;t worry, you can change it later.
      </p>
      <UForm
        :validate="validate"
        :state="form"
        class="space-y-4"
        @submit="submit"
      >
        <UFormGroup label="Course title" name="title">
          <UInput
            v-model="form.title"
            :loading="loading"
            placeholder="e.g. Advanced web development"
          />
        </UFormGroup>
        <div class="w-full flex items-center gap-x-2">
          <UButton variant="ghost" type="button" @click="$router.push('/')">
            Cancel
          </UButton>
          <UButton color="black" type="submit" :loading="loading">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

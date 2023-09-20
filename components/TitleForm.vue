<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const props = defineProps<{
  courseId: string
  title: string
}>()

const toast = useToast()

const state = ref({
  title: ''
})

const loading = ref(false)
const isEdit = ref(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) {
    errors.push({ path: 'title', message: 'Required' })
  }
  return errors
}

const submit = async (event: FormSubmitEvent<any>) => {
  try {
    loading.value = true
    await useFetch(`/api/courses/${props.courseId}`, {
      body: {
        title: event.data.title
      },
      method: 'PATCH'
    })
    toast.add({
      title: 'Course updated',
      icon: 'i-heroicons-check-circle'
    })
    toggleEdit()
    window.location.reload()
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
  <div class="mt-6 border bg-slate-100 rounded-md p-4">
    <div class="font-medium flex items-center justify-between">
      Course title
      <UButton variant="ghost" @click="toggleEdit">
        <div v-if="isEdit">
          Cancel
        </div>
        <div v-else class="flex items-center gap-x-2">
          <UIcon class="h-4 w-4 mr-2" name="i-carbon-edit" />
          <span>Edit title</span>
        </div>
      </UButton>
    </div>
    <div v-if="!isEdit">
      <p class="text-sm mt-2">
        {{ title }}
      </p>
    </div>
    <div v-else>
      <UForm
        class="space-y-4 mt-4"
        :validate="validate"
        :state="state"
        @submit="submit"
      >
        <UFormGroup label="Title" name="title">
          <UInput
            v-model="state.title"
            :loading="loading"
            placeholder="e.g. 'Advanced Vue development'"
          />
        </UFormGroup>
        <div class="flex items-center gap-x-2">
          <UButton type="submit" :loading="loading" color="black" label="Save" />
        </div>
      </UForm>
    </div>
  </div>
</template>

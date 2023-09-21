<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
// @ts-ignore
import type { Chapter } from '@prisma/client'

const props = defineProps<{
  courseId: string
  chapters: Chapter[]
}>()

const toast = useToast()

const state = ref({
  title: ''
})

const loading = ref(false)
const isCreating = ref(false)
const isUpdating = ref(false)

const toggleCreating = () => {
  isCreating.value = !isCreating.value
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
    await useFetch('/api/courses/' + props.courseId + '/chapters', {
      body: {
        title: event.data.title
      },
      method: 'POST'
    })
    toast.add({
      title: 'Chapter created',
      icon: 'i-heroicons-check-circle'
    })
    toggleCreating()
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
      Course Chapters
      <UButton variant="ghost" @click="toggleCreating">
        <div v-if="isCreating">
          Cancel
        </div>
        <div v-else class="flex items-center gap-x-2">
          <UIcon class="h-4 w-4 mr-2" name="i-carbon-add-alt" />
          <span>Add a chapter</span>
        </div>
      </UButton>
    </div>
    <div v-if="isCreating">
      <UForm
        class="space-y-4 mt-4"
        :validate="validate"
        :state="state"
        @submit="submit"
      >
        <UFormGroup label="Title" name="title">
          <UInput
            v-model="state.title"
            :disabled="loading"
            placeholder="e.g. 'Introduction to the chapter...'"
          />
        </UFormGroup>
        <div class="flex items-center gap-x-2">
          <UButton
            type="submit"
            :loading="loading"
            color="black"
            label="Create"
          />
        </div>
      </UForm>
    </div>
    <div
      v-if="!isCreating"
      class="text-sm mt-2"
      :class="!chapters.length && 'text-slate-600 italic'"
    >
      <div v-if="!chapters.length">
        No chapters
      </div>
      <ChaptersList v-else :chapters="chapters" />
      <p class="text-xs text-neutral-600 mt-4">
        Drag and drop to reorder the chapters
      </p>
    </div>
  </div>
</template>

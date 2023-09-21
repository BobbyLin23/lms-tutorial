<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const props = defineProps<{
  courseId: string
  categoryId: string
  options: {
    label: string;
    value: string
  }[]
}>()

const toast = useToast()

const loading = ref(false)
const isEdit = ref(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}

const state = ref({
  categoryId: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.categoryId) {
    errors.push({ path: 'categoryId', message: 'Required' })
  }
  return errors
}

const submit = async (event: FormSubmitEvent<any>) => {
  try {
    loading.value = true
    await useFetch(`/api/courses/${props.courseId}`, {
      body: {
        categoryId: event.data.categoryId
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

const selectedOption = computed(() => props.options.find(option => option.value === props.categoryId))
</script>

<template>
  <div class="mt-6 border bg-slate-100 rounded-md p-4">
    <div class="font-medium flex items-center justify-between">
      Course Category
      <UButton variant="ghost" @click="toggleEdit">
        <div v-if="isEdit">
          Cancel
        </div>
        <div v-else class="flex items-center gap-x-2">
          <UIcon class="h-4 w-4 mr-2" name="i-carbon-edit" />
          <span>Edit category</span>
        </div>
      </UButton>
    </div>
    <div v-if="!isEdit">
      <p class="text-sm mt-2" :class="!categoryId && 'text-slate-500 italic'">
        {{ selectedOption?.label || 'No category' }}
      </p>
    </div>
    <div v-else>
      <UForm
        class="space-y-4 mt-4"
        :validate="validate"
        :state="state"
        @submit="submit"
      >
        <UFormGroup label="Category" name="category">
          <ComboBox :options="options" :category-id="categoryId" @update="(val) => state.categoryId = val" />
        </UFormGroup>
        <div class="flex items-center gap-x-2">
          <UButton
            type="submit"
            :loading="loading"
            color="black"
            label="Save"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>

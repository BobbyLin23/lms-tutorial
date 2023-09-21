<script setup lang="ts">
import { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const props = defineProps<{
  courseId: string
  price: number | null
}>()

const toast = useToast()

const loading = ref(false)
const isEdit = ref(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}

const state = ref({
  price: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.price) {
    errors.push({ path: 'price', message: 'Required' })
  }
  return errors
}

const submit = async (event: FormSubmitEvent<any>) => {
  try {
    loading.value = true
    await useFetch(`/api/courses/${props.courseId}`, {
      body: {
        price: event.data.price
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
      Course Price
      <UButton variant="ghost" @click="toggleEdit">
        <div v-if="isEdit">
          Cancel
        </div>
        <div v-else class="flex items-center gap-x-2">
          <UIcon class="h-4 w-4 mr-2" name="i-carbon-edit" />
          <span>Edit price</span>
        </div>
      </UButton>
    </div>
    <div v-if="!isEdit">
      <p class="text-sm mt-2" :class="!price && 'text-slate-500 italic'">
        {{ price ? formatPrice(price) : 'No price' }}
      </p>
    </div>
    <div v-else>
      <UForm
        class="space-y-4 mt-4"
        :validate="validate"
        :state="state"
        @submit="submit"
      >
        <UFormGroup label="Price" name="price">
          <UInput
            v-model="state.price"
            :loading="loading"
            type="number"
            step="0.01"
            placeholder="Set a price for your course"
          />
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

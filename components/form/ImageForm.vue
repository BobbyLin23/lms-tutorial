<script setup lang="ts">
const props = defineProps<{
  courseId: string
  imageUrl: string | null
}>()

const config = useRuntimeConfig()

const toast = useToast()

const isEdit = ref(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}

const handleUpload = async (path: string) => {
  if (!path) {
    toast.add({
      title: 'Upload failed',
      icon: 'i-heroicons-x-circle-20-solid'
    })
    return
  }
  const imageUrl = config.public.SUPABASE_URL + '/storage/v1/object/public/lms-store/public/' + path
  await useFetch(`/api/courses/${props.courseId}`, {
    method: 'PATCH',
    body: {
      imageUrl
    }
  })
  toast.add({
    title: 'Image updated',
    icon: 'i-heroicons-check-circle'
  })
  window.location.reload()
}
</script>

<template>
  <div class="mt-6 border bg-slate-100 rounded-md p-4">
    <div class="font-medium flex items-center justify-between">
      Course Image
      <UButton variant="ghost" @click="toggleEdit">
        <div v-if="isEdit">
          Cancel
        </div>
        <div v-else class="flex items-center gap-x-2">
          <UIcon
            class="h-4 w-4 mr-2"
            :name="imageUrl ? 'i-carbon-edit' : 'i-carbon-add-alt'"
          />
          <span>{{ imageUrl ? 'Edit image' : 'Add an image' }}</span>
        </div>
      </UButton>
    </div>
    <div v-if="!isEdit">
      <div
        v-if="!imageUrl"
        class="flex items-center justify-center h-60
        bg-slate-200 rounded-md"
      >
        <UIcon name="i-carbon-image" class="h-10 w-10 text-slate-500" />
      </div>
      <div v-else class="relative aspect-video mt-2">
        <img alt="upload" class="object-cover rounded-md" :src="imageUrl">
      </div>
    </div>
    <div v-else>
      <FileUpload @upload="handleUpload" />
      <div class="text-xs text-neutral-600 mt-4">
        16:9 aspect ratio recommended
      </div>
    </div>
  </div>
</template>

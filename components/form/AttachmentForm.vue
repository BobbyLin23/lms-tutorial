<script setup lang="ts">
import { Attachment } from '~/types/schema'

const props = defineProps<{
  courseId: string
  attachments: Attachment[]
}>()

const config = useRuntimeConfig()

const toast = useToast()

const isEdit = ref(false)

const deletingId = ref<string | null>(null)

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
  const url = config.public.SUPABASE_URL + '/storage/v1/object/public/lms-store/public/' + path
  await useFetch(`/api/courses/${props.courseId}/attachments`, {
    method: 'POST',
    body: {
      url
    }
  })
  toast.add({
    title: 'File updated',
    icon: 'i-heroicons-check-circle'
  })
  window.location.reload()
}

const onDelete = async (id: string) => {
  try {
    deletingId.value = id
    await useFetch('/api/courses/' + props.courseId + '/attachments/' + id, {
      method: 'DELETE'
    })
    toast.add({
      title: 'File deleted',
      icon: 'i-heroicons-check-circle'
    })
    window.location.reload()
  } catch (error) {
    toast.add({
      title: 'Something went wrong',
      icon: 'i-heroicons-x-circle-20-solid'
    })
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="mt-6 border bg-slate-100 rounded-md p-4">
    <div class="font-medium flex items-center justify-between">
      Course Attachments
      <UButton variant="ghost" @click="toggleEdit">
        <div v-if="isEdit">
          Cancel
        </div>
        <div v-else class="flex items-center gap-x-2">
          <UIcon
            class="h-4 w-4 mr-2"
            name="i-carbon-add-alt"
          />
          <span>Add a file</span>
        </div>
      </UButton>
    </div>
    <div v-if="!isEdit">
      <div v-if="attachments.length === 0">
        <p class="text-sm mt-2 text-slate-500 italic">
          No attachments yet
        </p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="attachment in attachments"
          :key="attachment.id"
          class="flex items-center p-3 w-full bg-sky-100 justify-between
          border-sky-200 text-sky-700 rounded-md"
        >
          <div class="flex items-center">
            <UIcon name="i-carbon-document" class="w-4 h-4 mr-2 flex-shrink-0" />
            <p class="text-xs line-clamp-1">
              {{ attachment.name }}
            </p>
          </div>
          <UButton
            v-if="deletingId === attachment.id"
            loading
            variant="link"
            loading-icon="i-carbon-circle-dash"
            class="w-4 h-4"
          />
          <UButton
            v-else
            variant="link"
            icon="i-carbon-close"
            class="w-4 h-4"
            @click="onDelete(attachment.id)"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <FileUpload @upload="handleUpload" />
      <div class="text-xs text-neutral-600 mt-4">
        Add anything your student might need for the course
      </div>
    </div>
  </div>
</template>

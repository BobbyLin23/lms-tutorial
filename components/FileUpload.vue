<script setup lang="ts">
const emits = defineEmits(['upload'])

const supabase = useSupabaseClient()
const toast = useToast()
const handleChange = async (e: any) => {
  const file = e.target.files[0]
  const { data, error } = await supabase.storage.from('lms-store').upload(`public/${file.name.trim()}`, file)
  if (error) {
    toast.add({
      title: error.message,
      icon: 'i-heroicons-x-circle-20-solid'
    })
  } else {
    console.log(data)
    emits('upload', data?.path)
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="upload"
      class="flex flex-col items-center justify-center w-full h-64 border-2
      border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50
      hover:bg-gray-100 "
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <UIcon name="i-carbon-cloud-upload" class="w-5 h-5 text-gray-500" />
        <p class="mb-2 text-sm text-gray-500 font-semibold">
          Click to upload
        </p>
      </div>
      <input id="upload" type="file" class="hidden" @change="handleChange">
    </label>
  </div>
</template>

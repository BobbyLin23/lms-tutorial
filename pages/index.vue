<script setup lang="ts">
const supabase = useSupabaseClient()
const toast = useToast()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    toast.add({
      title: error.message,
      icon: 'i-heroicons-x-circle-20-solid'
    })
  } else {
    navigateTo('/login')
  }
}
</script>

<template>
  <div class="text-red-400">
    Hello
    <UButton @click="signOut">
      Click
    </UButton>
  </div>
</template>

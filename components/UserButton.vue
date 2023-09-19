<script setup lang="ts">
const supabase = useSupabaseClient()
const toast = useToast()

const items = [
  [
    {
      label: 'Log Out',
      icon: 'i-carbon-logout',
      click: () => signOut()
    }
  ]
]

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
  <UDropdown
    :items="items"
    :popper="{
      placement: 'bottom'
    }"
  >
    <UAvatar icon="i-carbon-user" class="cursor-pointer" />
  </UDropdown>
</template>

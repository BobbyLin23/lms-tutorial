<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })

</script>

<template>
  <div class="h-full flex items-center justify-center">
    <UButton variant="link" loading loading-icon="i-carbon-circle-dash" />
  </div>
</template>

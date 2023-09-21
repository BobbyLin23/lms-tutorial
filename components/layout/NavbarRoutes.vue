<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const isTeacherPage = computed(() => route.path.startsWith('/teacher'))
const isPlayerPage = computed(() => route.path.startsWith('/chapter'))
</script>

<template>
  <div class="flex gap-x-2 ml-auto">
    <UButton
      v-if="isTeacherPage || isPlayerPage"
      size="sm"
      variant="ghost"
      label="Exit"
      icon="i-carbon-logout"
      @click="router.push('/')"
    />
    <UButton v-else size="sm" variant="ghost" label="Teacher mode" @click="router.push('/teacher/courses')" />
    <UserButton />
  </div>
</template>

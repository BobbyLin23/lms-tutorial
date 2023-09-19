<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div>
    <UIcon
      name="i-carbon-menu"
      class="w-5 h-5 md:hidden pr-4 hover:opacity-75 transition"
      @click="isOpen = true"
    />
    <USlideover
      v-model="isOpen"
      side="left"
    >
      <SideBar />
      <NavbarRoutes />
    </USlideover>
  </div>
</template>

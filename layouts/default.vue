<script setup lang="ts">

</script>

<template>
  <div class="h-full">
    <div
      class="hidden md:flex h-full w-56 flex-col fixed
      inset-y-0 z-50"
    >
      <SideBar />
    </div>
    <slot />
  </div>
</template>

<style scoped>

</style>

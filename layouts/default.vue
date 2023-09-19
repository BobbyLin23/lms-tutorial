<script setup lang="ts">

</script>

<template>
  <div class="h-full">
    <div class="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
      <NavBar />
    </div>
    <div
      class="hidden md:flex h-full w-56 flex-col fixed
      inset-y-0 z-50"
    >
      <SideBar />
    </div>
    <main class="md:pl-56 pt-[80px] h-full">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>

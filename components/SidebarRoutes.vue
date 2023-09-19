<script setup lang="ts">
const guestRoutes = [
  {
    icon: '',
    label: 'Dashboard',
    href: '/'
  },
  {
    icon: '',
    label: 'Browse',
    href: '/search'
  }
]
</script>

<template>
  <div class="flex flex-col w-full">
    <SidebarItem
      v-for="route in guestRoutes"
      :key="route.href"
      :icon="route.icon"
      :label="route.label"
      :href="route.href"
    />
  </div>
</template>

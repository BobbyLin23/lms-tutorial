<script setup lang="ts">
const route = useRoute()

const isTeacherPage = computed(() => route.path.startsWith('/teacher'))

const routes = computed(() => isTeacherPage.value ? teacherRoutes : guestRoutes)

const guestRoutes = [
  {
    icon: 'i-carbon-dashboard',
    label: 'Dashboard',
    href: '/'
  },
  {
    icon: 'i-carbon-compass',
    label: 'Browse',
    href: '/search'
  }
]

const teacherRoutes = [
  {
    icon: 'i-carbon-course',
    label: 'Courses',
    href: '/teacher/courses'
  },
  {
    icon: 'i-carbon-analytics',
    label: 'Analytics',
    href: '/teacher/analytics'
  }
]
</script>

<template>
  <div class="flex flex-col w-full">
    <SidebarItem
      v-for="item in routes"
      :key="item.href"
      :icon="item.icon"
      :label="item.label"
      :href="item.href"
    />
  </div>
</template>

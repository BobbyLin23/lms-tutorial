<script setup lang="ts">
const props = defineProps<{
  icon: string
  label: string
  href: string
}>()

const route = useRoute()
const router = useRouter()

const isActive = computed(() => {
  return (route.path === '/' && props.href === '/') ||
      route.path === props.href ||
      route.path.startsWith(`/${props.href}`)
})

const onClick = () => {
  router.push(props.href)
}
</script>

<template>
  <button
    type="button"
    class="flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6
    transition-all hover:text-slate-600 hover:bg-slate-300/20"
    :class="isActive && 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700'"
    @click="onClick"
  >
    <div class="flex items-center gap-x-2 py-4">
      <UIcon :name="icon" class="h-5 w-5" :class="isActive && 'text-sky-700'" />
      <span>{{ label }}</span>
    </div>
    <div
      class="ml-auto opacity-0 border-2 border-sky-700 h-full
      transition-all"
      :class="isActive && 'opacity-100'"
    />
  </button>
</template>

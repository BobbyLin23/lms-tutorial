<script setup lang="ts">
const props = defineProps<{
  options: {
    label: string
    value: string
  }[]
  categoryId?: string
}>()
const emits = defineEmits(['update'])

const selected = ref(props.categoryId || props.options[0].value)
const current = computed(() => props.options.find(i => i.value === selected.value))

watch(selected, () => {
  emits('update', selected.value)
})
</script>

<template>
  <USelectMenu
    v-model="selected"
    searchable
    searchable-placeholder="Search a person..."
    :options="options"
    value-attribute="value"
    option-attribute="label"
  >
    <template #label>
      {{ current.label }}
    </template>
  </USelectMenu>
</template>

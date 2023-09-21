<script setup lang="ts">
// @ts-ignore
import { Chapter } from '@prisma/client'
import draggable from 'vuedraggable'
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  chapters: Chapter[]
}>()

const items = toRef(props.chapters)
const drag = ref(true)

const onEdit = (id: string) => {}

const onReorder = (updateData: { id: string; position: number }[]) => {}
</script>

<template>
  <draggable
    v-model="items"
    group="chapter"
    item-key="id"
    @start="drag = true"
    @end="drag = false"
    @change="onReorder"
  >
    <template #item="{ element }">
      <div
        class="px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300
        rounded-l-md transition flex items-center"
        :class="element.isPublished && 'border-r-sky-200 hover:bg-sky-200'"
      >
        <UIcon name="i-carbon-grid" class="w-5 h-5" />
        <div class="ml-2">
          {{ element.title }}
        </div>
        <div class="ml-auto pr-2 flex items-center gap-x-2">
          <UBadge v-if="element.isFree">
            Free
          </UBadge>
          <UBadge :class="twMerge('bg-slate-500', element.isPublished && 'bg-sky-700')">
            {{ element.isPublished ? 'Published' : 'Draft' }}
          </UBadge>
          <UIcon
            name="i-carbon-edit"
            class="w-4 h-4 cursor-pointer hover:opacity-75 transition"
            @click="onEdit(element.id)"
          />
        </div>
      </div>
    </template>
  </draggable>
</template>

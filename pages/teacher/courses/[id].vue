<script setup lang="ts">
import { prisma } from '~/utils/prisma'

const route = useRoute()
const user = useSupabaseUser()

const course = await prisma.course.findUnique({
  where: {
    id: route.params.id as string
  }
})

const requiredFields = [
  course?.title,
  course?.description,
  course?.imageUrl,
  course?.price,
  course?.categoryId
]

const totalFields = requiredFields.length
const completedFields = requiredFields.filter(Boolean).length

const completionText = `(${completedFields}/${totalFields})`

onMounted(() => {
  if (!user.value) {
    navigateTo('/')
  }
  if (!course) {
    navigateTo('/')
  }
})
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-y-2">
        <h1 class="text-2xl font-medium">
          Course setup
        </h1>
        <span class="text-sm text-slate-700">
          Complete all fields {{ completionText }}
        </span>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
      <div>
        <div class="flex items-center gap-x-2">
          <IconBadge icon="i-carbon-dashboard-reference" />
          <h2 class="text-xl">
            Customize your course
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

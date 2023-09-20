<script setup lang="ts">
import { Course } from '@prisma/client'

const route = useRoute()
const user = useSupabaseUser()

const { data } = await useFetch('/api/courses/' + route.params.id, {
  method: 'GET'
})

const course = ref<Course | undefined>(data.value?.course)

const requiredFields = [
  course.value?.title,
  course.value?.description,
  course.value?.imageUrl,
  course.value?.price,
  course.value?.categoryId
]

const totalFields = requiredFields.length
const completedFields = requiredFields.filter(Boolean).length

const completionText = `(${completedFields}/${totalFields})`

onMounted(() => {
  if (!user.value) {
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
        <TitleForm :course-id="course?.id" :title="course?.title" />
      </div>
    </div>
  </div>
</template>

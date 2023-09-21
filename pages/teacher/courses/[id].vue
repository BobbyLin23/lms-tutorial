<script setup lang="ts">
// @ts-ignore
import type { Course, Category } from '@prisma/client'
import ImageForm from '~/components/form/ImageForm.vue'
import CategoryForm from '~/components/form/CategoryForm.vue'

const route = useRoute()
const user = useSupabaseUser()

const { data: course } = await useFetch<Course>('/api/courses/' + route.params.id, {
  method: 'GET'
})

const requiredFields = [
  course.value?.title,
  course.value?.description,
  course.value?.imageUrl,
  course.value?.price,
  course.value?.categoryId,
  course.value?.chapters.some(chapter => chapter.isPublished)
]

const totalFields = requiredFields.length
const completedFields = requiredFields.filter(Boolean).length

const completionText = `(${completedFields}/${totalFields})`

const { data: categories } = await useFetch<Category[]>('/api/categories', {
  method: 'GET'
})

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
        <DescriptionForm :course-id="course?.id" :description="course?.description" />
        <ImageForm :image-url="course?.imageUrl" :course-id="course?.id" />
        <CategoryForm
          :options="categories?.map((category) => ({ label: category.name, value: category.id }))"
          :course-id="course?.id"
          :category-id="course?.categoryId"
        />
      </div>
      <div class="space-y-6">
        <div>
          <div class="flex items-center gap-x-2">
            <IconBadge icon="i-carbon-list-checked" />
            <h2 class="text-xl">
              Course Chapter
            </h2>
          </div>
          <DescriptionForm :course-id="course?.id" :description="course?.description" />
        </div>
        <div class="flex items-center gap-x-2">
          <IconBadge icon="i-carbon-currency-dollar" />
          <h2 class="text-xl">
            Sell your course
          </h2>
        </div>
        <PriceForm :course-id="course?.id" :price="course?.price" />
      </div>
      <div>
        <div class="flex items-center gap-x-2">
          <IconBadge icon="i-carbon-document-blank" />
          <h2 class="text-xl">
            Resources & Attachments
          </h2>
        </div>
        <AttachmentForm :attachments="course?.attachments" :course-id="course?.id" />
      </div>
    </div>
  </div>
</template>

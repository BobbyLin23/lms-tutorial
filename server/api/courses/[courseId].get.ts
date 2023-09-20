import { prisma } from '~/utils/prisma'

export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, 'courseId')

  if (!courseId) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course not found'
    })
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId
    }
  })

  return {
    course
  }
})

import { prisma } from '~/utils/prisma'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, 'courseId')

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  if (!courseId) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course not found'
    })
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: user.id
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc'
        }
      },
      attachments: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!course) {
    return null
  }

  return course
})

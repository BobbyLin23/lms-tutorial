import { serverSupabaseUser } from '#supabase/server'
import { prisma } from '~/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const courseId = getRouterParam(event, 'courseId')
    const attachmentId = getRouterParam(event, 'attachmentId')
    const user = await serverSupabaseUser(event)

    if (!user) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: user.id
      }
    })

    if (!courseOwner) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    return await prisma.attachment.delete({
      where: {
        id: attachmentId,
        courseId
      }
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})

import { serverSupabaseUser } from '#supabase/server'
import { prisma } from '~/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)
    const courseId = getRouterParam(event, 'courseId')
    const values = await readBody(event)

    if (!user) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
        userId: user.id
      },
      data: {
        ...values
      }
    })

    return { course }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})

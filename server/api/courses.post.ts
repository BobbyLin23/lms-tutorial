import { serverSupabaseUser } from '#supabase/server'
import { prisma } from '~/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)
    const body = await readBody(event)

    if (!user) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    return await prisma.course.create({
      data: {
        userId: user.id,
        title: body.title
      }
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})

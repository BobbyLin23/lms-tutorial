import { serverSupabaseUser } from '#supabase/server'
import { prisma } from '~/utils/prisma'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const { url } = await readBody(event)
  const courseId = getRouterParam(event, 'courseId')

  if (!user) {
    throw createError({
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
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  return await prisma.attachment.create({
    // @ts-ignore
    data: {
      url,
      name: url.split('/').pop(),
      courseId
    }
  })
})

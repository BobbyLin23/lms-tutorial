import { serverSupabaseUser } from '#supabase/server'
import { prisma } from '~/utils/prisma'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const { title } = await readBody(event)
  const courseId = getRouterParam(event, 'courseId')

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

  const lastChapter = await prisma.chapter.findFirst({
    where: {
      courseId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const newPosition = lastChapter ? lastChapter.position + 1 : 1

  return await prisma.chapter.create({
    // @ts-ignore
    data: {
      title,
      position: newPosition,
      courseId
    }
  })
})

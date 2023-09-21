import { serverSupabaseUser } from '#supabase/server'
import { prisma } from '~/utils/prisma'

export default defineEventHandler(async (event) => {
  const user = serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  if (!categories) {
    return null
  }

  return categories
})

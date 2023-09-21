const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main () {
  try {
    await db.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Mathematics' },
        { name: 'Physics' },
        { name: 'Chemistry' },
        { name: 'Biology' },
        { name: 'History' }
      ]
    })
    console.log('Successfully seeded database!')
  } catch (error) {
    console.log(error)
  } finally {
    await db.$disconnect()
  }
}

main()

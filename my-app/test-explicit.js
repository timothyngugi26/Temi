const { PrismaClient } = require('@prisma/client')

// Create Prisma client with explicit URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:/tmp/temi-app.db'
    }
  }
})

async function test() {
  try {
    console.log('Testing with explicit database URL...')
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table'`
    console.log('✅ Success! Tables found:', tables)
    
    const schools = await prisma.school.findMany({ take: 3 })
    console.log('Sample schools:', schools.map(s => s.name))
  } catch (error) {
    console.log('❌ Failed:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

test()

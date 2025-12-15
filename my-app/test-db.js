const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:/tmp/temi-db.sqlite'
    }
  }
})

async function test() {
  try {
    console.log('Testing Prisma connection...')
    
    // Test 1: Raw query
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table'`
    console.log('✅ Raw query successful!')
    console.log('Tables:', tables)
    
    // Test 2: Count schools
    const schoolCount = await prisma.school.count()
    console.log(`Schools in database: ${schoolCount}`)
    
    // Test 3: Get sample schools
    if (schoolCount > 0) {
      const schools = await prisma.school.findMany({
        select: { 
          id: true, 
          name: true, 
          email: true,
          homeHubApproved: true 
        },
        take: 3
      })
      console.log('Sample schools:', schools)
    }
    
    // Test 4: Count users
    const userCount = await prisma.user.count()
    console.log(`Users in database: ${userCount}`)
    
  } catch (error) {
    console.log('❌ Prisma connection failed:')
    console.log('Error:', error.message)
    console.log('Stack:', error.stack.split('\n')[0])
  } finally {
    await prisma.$disconnect()
    console.log('\nTest complete!')
  }
}

test()

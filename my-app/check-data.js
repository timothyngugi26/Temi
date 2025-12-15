const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkData() {
  console.log('=== Database Check ===\n')
  
  // Count records
  const schoolCount = await prisma.school.count()
  const userCount = await prisma.user.count()
  const studentCount = await prisma.student.count()
  const teacherCount = await prisma.teacher.count()
  const projectCount = await prisma.project.count()
  const rewardCount = await prisma.reward.count()
  
  console.log(`Schools: ${schoolCount}`)
  console.log(`Users: ${userCount}`)
  console.log(`Students: ${studentCount}`)
  console.log(`Teachers: ${teacherCount}`)
  console.log(`Projects: ${projectCount}`)
  console.log(`Rewards: ${rewardCount}`)
  
  console.log('\n=== School Details ===')
  const schools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      homeHubApproved: true,
      homeHubRef: true
    },
    orderBy: { name: 'asc' }
  })
  
  schools.forEach((school, i) => {
    console.log(`${i + 1}. ${school.name}`)
    console.log(`   ID: ${school.id.substring(0, 8)}...`)
    console.log(`   Email: ${school.email}`)
    console.log(`   Phone: ${school.phone}`)
    console.log(`   HomeHub Approved: ${school.homeHubApproved}`)
    console.log(`   HomeHub Ref: ${school.homeHubRef}`)
    console.log()
  })
}

checkData()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

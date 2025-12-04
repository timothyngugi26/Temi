import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clean up existing data
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()
  await prisma.school.deleteMany()

  // Create a sample school
  const school = await prisma.school.create({
    data: {
      name: 'Green Valley High School',
      email: 'contact@greenvalley.edu',
      description: 'A progressive school focused on STEM and creative arts',
      location: 'Nairobi, Kenya',
      homehubApproved: true,
      homehubRef: 'GVH-2024-001',
    },
  })

  console.log(`🏫 Created school: ${school.name}`)

  // Create sample users
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@greenvalley.edu',
      name: 'Mr. James Kariuki',
      role: 'TEACHER',
      approved: true,
      schoolId: school.id,
      discipline: 'Mathematics & Physics',
    },
  })

  const student1 = await prisma.user.create({
    data: {
      email: 'student1@greenvalley.edu',
      name: 'Sarah Mwangi',
      role: 'STUDENT',
      approved: true,
      schoolId: school.id,
      discipline: 'Computer Science',
      points: 25,
    },
  })

  const student2 = await prisma.user.create({
    data: {
      email: 'student2@greenvalley.edu',
      name: 'David Omondi',
      role: 'STUDENT',
      approved: true,
      schoolId: school.id,
      discipline: 'Engineering',
      points: 18,
    },
  })

  console.log(`👨‍🏫 Created teacher: ${teacher.name}`)
  console.log(`👩‍🎓 Created students: ${student1.name}, ${student2.name}`)

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      title: 'AI-Powered Irrigation System',
      description: 'An IoT system that uses machine learning to optimize water usage in agriculture',
      type: 'STEM',
      tags: 'AI,IoT,Agriculture,Sustainability',
      creatorId: student1.id,
      schoolId: school.id,
      status: 'PUBLISHED',
      featured: true,
      rewards: 45,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      title: 'Mathematical Art Gallery',
      description: 'Digital art created using mathematical equations and algorithms',
      type: 'CREATIVE',
      tags: 'Math,Art,Creative',
      creatorId: student2.id,
      schoolId: school.id,
      status: 'PUBLISHED',
      rewards: 32,
    },
  })

  console.log(`🚀 Created projects: ${project1.title}, ${project2.title}`)
  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

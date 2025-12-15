import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean up existing data (if tables exist)
  try {
    await prisma.pointTransaction.deleteMany()
    await prisma.redeemedReward.deleteMany()
    await prisma.project.deleteMany()
    await prisma.reward.deleteMany()
    await prisma.student.deleteMany()
    await prisma.teacher.deleteMany()
    await prisma.schoolAdmin.deleteMany()
    await prisma.school.deleteMany()
    await prisma.user.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.verificationToken.deleteMany()
  } catch (error) {
    console.log('Note: Some tables may not exist yet, continuing...')
  }

  // Create a school with all new fields
  const school = await prisma.school.create({
    data: {
      name: 'Demo High School',
      description: 'A demonstration school for the Temi platform',
      email: 'info@demohigh.edu',
      phone: '+254700000000',
      address: '123 Education Street, Nairobi, Kenya',
      logo: '/school-logos/demo-high.png',
      homeHubApproved: true,
      homeHubRef: 'HH-2023-001',
    },
  })

  console.log('Created school:', school.name)

  // Create a system admin
  const adminPassword = await hash('admin123', 12)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@temi.com',
      name: 'System Admin',
      password: adminPassword,
      role: 'SYSTEM_ADMIN',
      emailVerified: new Date(),
    },
  })
  console.log('Created admin user:', adminUser.email)

  // Create a school admin
  const schoolAdminPassword = await hash('schooladmin123', 12)
  const schoolAdminUser = await prisma.user.create({
    data: {
      email: 'principal@demohigh.edu',
      name: 'School Principal',
      password: schoolAdminPassword,
      role: 'SCHOOL_ADMIN',
      emailVerified: new Date(),
    },
  })
  console.log('Created school admin:', schoolAdminUser.email)

  const schoolAdmin = await prisma.schoolAdmin.create({
    data: {
      userId: schoolAdminUser.id,
      schoolId: school.id,
    },
  })

  // Create a teacher
  const teacherPassword = await hash('teacher123', 12)
  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@demohigh.edu',
      name: 'John Doe',
      password: teacherPassword,
      role: 'TEACHER',
      emailVerified: new Date(),
    },
  })
  console.log('Created teacher:', teacherUser.email)

  const teacher = await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
      schoolId: school.id,
      subject: 'Mathematics',
    },
  })

  // Create a student
  const studentPassword = await hash('student123', 12)
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@demohigh.edu',
      name: 'Jane Smith',
      password: studentPassword,
      role: 'STUDENT',
      emailVerified: new Date(),
    },
  })
  console.log('Created student:', studentUser.email)

  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      schoolId: school.id,
      grade: 'Form 4',
      points: 100,
    },
  })

  // Create some rewards
  const rewards = await Promise.all([
    prisma.reward.create({
      data: {
        name: 'Pizza Lunch',
        description: 'Enjoy a delicious pizza lunch with friends',
        pointsCost: 50,
        stock: 10,
        schoolId: school.id,
      },
    }),
    prisma.reward.create({
      data: {
        name: 'Homework Pass',
        description: 'Skip one homework assignment',
        pointsCost: 30,
        stock: 20,
        schoolId: school.id,
      },
    }),
    prisma.reward.create({
      data: {
        name: 'Gift Card',
        description: '$10 Amazon gift card',
        pointsCost: 100,
        stock: 5,
        schoolId: school.id,
      },
    }),
  ])
  console.log('Created', rewards.length, 'rewards')

  // Create a sample project
  const project = await prisma.project.create({
    data: {
      title: 'Algebra Assignment',
      description: 'Complete exercises 1-10 from chapter 3',
      subject: 'Mathematics',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      maxPoints: 20,
      schoolId: school.id,
      teacherId: teacher.id,
      studentId: student.id,
      status: 'PENDING',
    },
  })
  console.log('Created project:', project.title)

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

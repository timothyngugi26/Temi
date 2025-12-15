import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Dynamic import to avoid build issues
    const { PrismaClient } = await import('@prisma/client')
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'file:/tmp/temi-db.sqlite'
        }
      }
    })
    
    const schoolCount = await prisma.school.count()
    const userCount = await prisma.user.count()
    const projectCount = await prisma.project.count()
    
    const recentSchools = await prisma.school.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        homeHubApproved: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      success: true,
      counts: {
        schools: schoolCount,
        users: userCount,
        projects: projectCount
      },
      recentSchools,
      database: process.env.DATABASE_URL || 'file:/tmp/temi-db.sqlite'
    })
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Database connection issue',
      suggestion: 'Check if /tmp/temi-db.sqlite exists and has data'
    }, { status: 500 })
  }
}

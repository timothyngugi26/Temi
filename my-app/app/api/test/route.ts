import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `
    
    const tableCounts = {}
    for (const table of tables) {
      const count = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM "${table.name}"`)
      tableCounts[table.name] = count[0].count
    }
    
    return NextResponse.json({
      success: true,
      database: 'Connected',
      tables: tables.map(t => t.name),
      counts: tableCounts,
      sampleUsers: await prisma.user.findMany({
        take: 3,
        select: { id: true, email: true, role: true }
      })
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      databaseUrl: process.env.DATABASE_URL
    }, { status: 500 })
  }
}

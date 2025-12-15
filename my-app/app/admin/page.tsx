import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getData() {
  const tables = await prisma.$queryRaw`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `
  
  const data = {}
  for (const table of tables) {
    const count = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM "${table.name}"`)
    data[table.name] = {
      count: count[0].count,
      sample: await prisma.$queryRawUnsafe(`SELECT * FROM "${table.name}" LIMIT 3`)
    }
  }
  
  return data
}

export default async function AdminPage() {
  const data = await getData()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Database Admin</h1>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(data).map(([tableName, tableData]) => (
          <div key={tableName} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{tableName}</h2>
            <p className="text-gray-600 mb-4">Records: {tableData.count}</p>
            <div className="text-sm overflow-x-auto">
              <pre>{JSON.stringify(tableData.sample, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

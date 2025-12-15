#!/bin/bash
echo "=== Setting Up Database ==="

cd /home/timotheous/Temi/my-app

echo "1. Stopping any running processes..."
pkill -f "next" 2>/dev/null || true
pkill -f "prisma" 2>/dev/null || true

echo "2. Setting up database file..."
# Copy database to /tmp for reliable access
cp -f dev.db /tmp/temi-db.sqlite
chmod 644 /tmp/temi-db.sqlite

echo "3. Setting environment variables..."
cat > .env << 'ENVFILE'
DATABASE_URL="file:/tmp/temi-db.sqlite"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
ENVFILE

export DATABASE_URL="file:/tmp/temi-db.sqlite"

echo "4. Generating Prisma client..."
npx prisma generate

echo "5. Testing database connection..."
# Test with SQLite directly
echo "   SQLite test:"
sqlite3 /tmp/temi-db.sqlite "SELECT name FROM sqlite_master WHERE type='table';"

echo "6. Creating test script..."
cat > /tmp/test-db-connection.js << 'TESTJS'
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
    const tables = await prisma.\$queryRaw\`SELECT name FROM sqlite_master WHERE type='table'\`
    console.log('✅ Prisma connected successfully!')
    console.log('Tables:', tables)
    
    const schoolCount = await prisma.school.count()
    console.log(\`Schools in database: \${schoolCount}\`)
    
    if (schoolCount > 0) {
      const schools = await prisma.school.findMany({
        select: { name: true, email: true },
        take: 3
      })
      console.log('Sample schools:', schools)
    }
  } catch (error) {
    console.log('❌ Prisma connection failed:')
    console.log('Error:', error.message)
  } finally {
    await prisma.\$disconnect()
  }
}

test()
TESTJS

echo "7. Running test..."
node /tmp/test-db-connection.js

echo "=== Setup Complete ==="

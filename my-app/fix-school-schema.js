const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== Fixing School Schema ===\n');

// 1. Check current schema
console.log('1. Checking current schema...');
try {
  const schema = execSync('cat prisma/schema.prisma | grep -A 30 "model School"', { encoding: 'utf8' });
  console.log('Schema has School model with fields');
  console.log(schema);
} catch (error) {
  console.log('Error reading schema:', error.message);
}

// 2. Check database structure
console.log('\n2. Checking database structure...');
try {
  const tableInfo = execSync('sqlite3 dev.db "PRAGMA table_info(School)"', { encoding: 'utf8' });
  console.log('Current School table columns:');
  console.log(tableInfo);
} catch (error) {
  console.log('Error checking database:', error.message);
}

// 3. Reset database if needed
console.log('\n3. Resetting database...');
try {
  execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
  console.log('✅ Database reset successfully');
} catch (error) {
  console.log('❌ Database reset failed');
}

// 4. Seed data
console.log('\n4. Seeding data...');
try {
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });
  console.log('✅ Data seeded successfully');
} catch (error) {
  console.log('❌ Seeding failed');
}

console.log('\n=== Fix Complete ===');

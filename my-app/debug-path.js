const { execSync } = require('child_process');

console.log('Testing different path formats...\n');

const paths = [
  'file:/home/timotheous/Temi/my-app/prisma/dev.db',
  'file:./prisma/dev.db',
  'file:prisma/dev.db',
  'file:dev.db'
];

paths.forEach(path => {
  console.log(`Testing: ${path}`);
  try {
    // Set environment variable and run simple query
    const result = execSync(
      `DATABASE_URL="${path}" npx prisma db execute --stdin --schema=prisma/schema.prisma`,
      { 
        input: 'SELECT 1 as test;',
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      }
    );
    console.log(`✅ Success: ${result.trim()}`);
  } catch (error) {
    console.log(`❌ Failed: ${error.message.split('\n')[0]}`);
  }
  console.log('---');
});

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addSchools() {
  const schools = [
    {
      name: 'Nairobi High School',
      description: 'Premier high school in Nairobi',
      email: 'admin@nairobi-high.edu',
      phone: '+254711111111',
      address: '456 Learning Avenue, Nairobi',
      logo: '/school-logos/nairobi-high.png',
      homeHubApproved: true,
      homeHubRef: 'HH-2023-002',
    },
    {
      name: 'Mombasa Academy',
      description: 'Coastal region top academy',
      email: 'info@mombasa-academy.edu',
      phone: '+254722222222',
      address: '789 Beach Road, Mombasa',
      logo: '/school-logos/mombasa-academy.png',
      homeHubApproved: false,
      homeHubRef: 'HH-2023-003',
    },
    {
      name: 'Kisumu Secondary',
      description: 'Lake region secondary school',
      email: 'contact@kisumu-secondary.edu',
      phone: '+254733333333',
      address: '321 Lakeview Drive, Kisumu',
      logo: '/school-logos/kisumu-secondary.png',
      homeHubApproved: true,
      homeHubRef: 'HH-2023-004',
    },
  ]

  console.log('Adding schools...')
  
  for (const schoolData of schools) {
    try {
      const school = await prisma.school.create({
        data: schoolData
      })
      console.log(`✅ Added school: ${school.name}`)
    } catch (error) {
      console.log(`❌ Failed to add school: ${schoolData.name}`)
      console.log(`   Error: ${error.message}`)
    }
  }
}

addSchools()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect()
    console.log('\nDone!')
  })

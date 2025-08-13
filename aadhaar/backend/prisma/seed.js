const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed validation rules
  const validationRules = [
    {
      fieldName: 'aadhaarNumber',
      ruleType: 'regex',
      ruleValue: '^\\d{12}$',
      errorMessage: 'Aadhaar must be exactly 12 digits',
      isActive: true
    },
    {
      fieldName: 'name',
      ruleType: 'regex',
      ruleValue: '^[a-zA-Z\\s]{3,}$',
      errorMessage: 'Name must contain only letters and be at least 3 characters long',
      isActive: true
    },
    {
      fieldName: 'panNumber',
      ruleType: 'regex',
      ruleValue: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
      errorMessage: 'Invalid PAN format (e.g., ABCDE1234F)',
      isActive: true
    },
    {
      fieldName: 'dobOrDoi',
      ruleType: 'regex',
      ruleValue: '^\\d{2}\\/\\d{2}\\/\\d{4}$',
      errorMessage: 'Date must be in DD/MM/YYYY format',
      isActive: true
    }
  ];

  for (const rule of validationRules) {
    await prisma.validationRule.upsert({
      where: { fieldName: rule.fieldName },
      update: {},
      create: rule
    });
  }

  console.log('Validation rules seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-cooperative' },
    update: {},
    create: {
      name: 'Cooperativa Demo',
      slug: 'demo-cooperative',
      nit: '900123456-7',
      email: 'info@cooperativa-demo.com',
      phone: '+57 1 234 5678',
      address: 'Calle 123 #45-67',
      city: 'Bogotá',
      status: 'ACTIVE',
    },
  });

  console.log(`✅ Created tenant: ${tenant.name}`);

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cooperativa-demo.com' },
    update: {},
    create: {
      email: 'admin@cooperativa-demo.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Create sample associates
  const associates = await Promise.all([
    prisma.associate.create({
      data: {
        documentType: 'CC',
        documentNumber: '1234567890',
        firstName: 'Juan',
        lastName: 'Pérez',
        dateOfBirth: new Date('1980-05-15'),
        gender: 'MALE',
        email: 'juan.perez@example.com',
        phone: '+57 300 123 4567',
        memberNumber: 'A001',
        joinDate: new Date('2020-01-15'),
        status: 'ACTIVE',
        contributions: 5000000,
        tenantId: tenant.id,
      },
    }),
    prisma.associate.create({
      data: {
        documentType: 'CC',
        documentNumber: '9876543210',
        firstName: 'María',
        lastName: 'García',
        dateOfBirth: new Date('1985-08-22'),
        gender: 'FEMALE',
        email: 'maria.garcia@example.com',
        phone: '+57 310 987 6543',
        memberNumber: 'A002',
        joinDate: new Date('2020-03-10'),
        status: 'ACTIVE',
        contributions: 7500000,
        tenantId: tenant.id,
      },
    }),
  ]);

  console.log(`✅ Created ${associates.length} associates`);

  // Create governance body
  const board = await prisma.governanceBody.create({
    data: {
      name: 'Consejo de Administración 2024',
      type: 'BOARD_OF_DIRECTORS',
      description: 'Consejo de Administración para el período 2024',
      startDate: new Date('2024-01-01'),
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  console.log(`✅ Created governance body: ${board.name}`);

  // Create governance positions
  await prisma.governancePosition.create({
    data: {
      position: 'Presidente',
      startDate: new Date('2024-01-01'),
      bodyId: board.id,
      associateId: associates[0].id,
    },
  });

  await prisma.governancePosition.create({
    data: {
      position: 'Secretaria',
      startDate: new Date('2024-01-01'),
      bodyId: board.id,
      associateId: associates[1].id,
    },
  });

  console.log('✅ Created governance positions');

  console.log('✨ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

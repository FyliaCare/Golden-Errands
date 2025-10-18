import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin@2024', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@goldenerrands.com' },
    update: {},
    create: {
      email: 'admin@goldenerrands.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phoneNumber: '0256039212',
      role: 'ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  console.log('✅ Created Admin User:', admin.email);

  // Create Dispatch Manager
  const dispatchPassword = await bcrypt.hash('dispatch@2024', 10);
  const dispatch = await prisma.user.upsert({
    where: { email: 'dispatch@goldenerrands.com' },
    update: {},
    create: {
      email: 'dispatch@goldenerrands.com',
      password: dispatchPassword,
      firstName: 'Dispatch',
      lastName: 'Manager',
      phoneNumber: '0256039213',
      role: 'DISPATCH_MANAGER',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  console.log('✅ Created Dispatch Manager:', dispatch.email);

  // Create Sample Drivers
  const driver1Password = await bcrypt.hash('driver@2024', 10);
  const driver1 = await prisma.user.upsert({
    where: { email: 'kwame.rider@goldenerrands.com' },
    update: {},
    create: {
      email: 'kwame.rider@goldenerrands.com',
      password: driver1Password,
      firstName: 'Kwame',
      lastName: 'Asante',
      phoneNumber: '0244123456',
      role: 'DRIVER',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  await prisma.driverProfile.upsert({
    where: { userId: driver1.id },
    update: {},
    create: {
      userId: driver1.id,
      vehicleType: 'MOTORCYCLE',
      isAvailable: true,
      currentLat: 5.603717,
      currentLng: -0.186964,
      rating: 4.8,
      totalDeliveries: 0,
    },
  });
  console.log('✅ Created Driver 1:', driver1.email);

  const driver2Password = await bcrypt.hash('driver@2024', 10);
  const driver2 = await prisma.user.upsert({
    where: { email: 'ama.delivery@goldenerrands.com' },
    update: {},
    create: {
      email: 'ama.delivery@goldenerrands.com',
      password: driver2Password,
      firstName: 'Ama',
      lastName: 'Mensah',
      phoneNumber: '0244654321',
      role: 'DRIVER',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  await prisma.driverProfile.upsert({
    where: { userId: driver2.id },
    update: {},
    create: {
      userId: driver2.id,
      vehicleType: 'BICYCLE',
      isAvailable: true,
      currentLat: 5.614818,
      currentLng: -0.205874,
      rating: 4.9,
      totalDeliveries: 0,
    },
  });
  console.log('✅ Created Driver 2:', driver2.email);

  // Create Sample Customer
  const customerPassword = await bcrypt.hash('customer@2024', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '0244987654',
      role: 'CUSTOMER',
      status: 'ACTIVE',
      emailVerified: true,
      address: 'Accra, Ghana',
    },
  });
  console.log('✅ Created Customer:', customer.email);

  // Create Finance User
  const financePassword = await bcrypt.hash('finance@2024', 10);
  const finance = await prisma.user.upsert({
    where: { email: 'finance@goldenerrands.com' },
    update: {},
    create: {
      email: 'finance@goldenerrands.com',
      password: financePassword,
      firstName: 'Finance',
      lastName: 'Officer',
      phoneNumber: '0256039214',
      role: 'FINANCE',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  console.log('✅ Created Finance User:', finance.email);

  // Create Delivery Zones
  const zone1 = await prisma.deliveryZone.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Accra Central',
      description: 'Central business district and surrounding areas',
      basePrice: 10,
      pricePerKm: 2,
      active: true,
    },
  });

  const zone2 = await prisma.deliveryZone.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'East Legon Area',
      description: 'East Legon, Cantonments, Airport Residential',
      basePrice: 15,
      pricePerKm: 2.5,
      active: true,
    },
  });

  console.log('✅ Created Delivery Zones');

  // Create System Settings
  await prisma.systemSetting.upsert({
    where: { key: 'company_name' },
    update: {},
    create: {
      key: 'company_name',
      value: 'Golden Errands',
      category: 'company',
      description: 'Company name',
    },
  });

  await prisma.systemSetting.upsert({
    where: { key: 'base_delivery_price' },
    update: {},
    create: {
      key: 'base_delivery_price',
      value: '10',
      category: 'pricing',
      description: 'Base delivery price in GHS',
    },
  });

  await prisma.systemSetting.upsert({
    where: { key: 'price_per_km' },
    update: {},
    create: {
      key: 'price_per_km',
      value: '2',
      category: 'pricing',
      description: 'Price per kilometer in GHS',
    },
  });

  console.log('✅ Created System Settings');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📝 Login Credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin:     admin@goldenerrands.com / admin@2024');
  console.log('Dispatch:  dispatch@goldenerrands.com / dispatch@2024');
  console.log('Driver 1:  kwame.rider@goldenerrands.com / driver@2024');
  console.log('Driver 2:  ama.delivery@goldenerrands.com / driver@2024');
  console.log('Customer:  customer@example.com / customer@2024');
  console.log('Finance:   finance@goldenerrands.com / finance@2024');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

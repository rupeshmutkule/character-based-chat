import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Ensure the Engineer category exists
  await prisma.category.upsert({
    where: { name: 'Engineer' },
    update: {},
    create: { name: 'Engineer' }
  });

  // Update Rupesh Mutkule to be an Engineer
  await prisma.companion.updateMany({
    where: { name: 'Rupesh Mutkule' },
    data: { category: 'Engineer' }
  });

  // Check if Entrepreneur category is empty and delete it if so
  const entrepreneurCount = await prisma.companion.count({
    where: { category: 'Entrepreneur' }
  });

  if (entrepreneurCount === 0) {
    try {
      await prisma.category.delete({
        where: { name: 'Entrepreneur' }
      });
      console.log("Deleted empty Entrepreneur category");
    } catch (error) {
       console.log("Entrepreneur category not found or couldn't be deleted", error);
    }
  } else {
    console.log(`Entrepreneur category still has ${entrepreneurCount} companions, not deleting.`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

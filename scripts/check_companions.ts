import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companions = await prisma.companion.findMany();
  console.log("Companions in DB:");
  for (const c of companions) {
    console.log(`- ${c.name} (Avatar: ${c.avatar || 'empty'}) [isPublic: ${c.isPublic}]`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

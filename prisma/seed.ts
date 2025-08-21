// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma/index.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { id_kategori: 1, name: "Elektronik", quantity: 13 },
      { id_kategori: 2, name: "Fashion", quantity: 15 },
      { id_kategori: 3, name: "Mainan", quantity: 24 },
    ],
    skipDuplicates: true, // biar ga error kalau udah ada
  });
}

main()
  .then(() => {
    console.log("Seeding selesai ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@example.com",
    },
  });

  await prisma.note.createMany({
    data: [
      { title: "Catatan Pertama", content: "Ini adalah catatan contoh pertama.", userId: user.id },
      { title: "Panduan Phase 2", content: "Auth.js + Prisma + Sentry sudah terintegrasi.", userId: user.id },
      { title: "TODO", content: "Deploy ke production dan setup monitoring.", userId: user.id },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completed: user + 3 notes created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

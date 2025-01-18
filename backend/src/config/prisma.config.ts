import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

// Graceful shutdown on process termination
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await prisma.$disconnect();
    process.exit(0);
  });
  process.on('SIGTERM', async () => {
    console.log('Server terminated...');
    await prisma.$disconnect();
    process.exit(0);
  });
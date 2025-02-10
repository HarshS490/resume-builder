import { NODE_ENV } from "@/config";
import { PrismaClient } from "@prisma/client";

interface globalForPrisma {
  prisma: PrismaClient;
}

declare const globalThis: globalForPrisma;

const prisma = globalThis.prisma || new PrismaClient();

if (NODE_ENV !== "production") globalThis.prisma = prisma;

export { prisma };

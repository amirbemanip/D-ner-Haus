import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Recursive proxy to handle missing environment variables gracefully
const createErrorProxy = (path: string = 'prisma'): any => {
  return new Proxy(() => {}, {
    get: (target, prop) => {
      // Handle standard JS properties and symbols to avoid issues with frameworks/logging
      if (typeof prop === 'symbol' || prop === 'prototype' || prop === 'constructor' || prop === 'toJSON') {
        return (target as any)[prop];
      }
      return createErrorProxy(`${path}.${String(prop)}`);
    },
    apply: () => {
      throw new Error(
        `Database connection error: The DATABASE_URL environment variable is missing or invalid. Please ensure it is correctly configured in your environment. (Error occurred while calling ${path})`
      );
    }
  });
};

const getPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    console.error('CRITICAL: DATABASE_URL is not defined. Prisma operations will fail.');
    return createErrorProxy();
  }

  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch (error) {
    console.error('Prisma initialization failed:', error);
    return createErrorProxy();
  }
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { PrismaClient } from '@prisma/client'

// Recursive proxy to handle any level of nesting (e.g., prisma.customer.findUnique)
const createRecursiveProxy = (name: string = '') => {
  return new Proxy(() => {}, {
    get(target, prop) {
      if (prop === 'then') return undefined;
      if (prop === 'catch') return undefined;
      if (typeof prop === 'string') {
        return createRecursiveProxy(prop);
      }
      return undefined;
    },
    apply(target, thisArg, args) {
      // Return a dummy object or array for common queries to avoid crashes in demo mode
      if (name.startsWith('findMany') || name.endsWith('Many')) {
        return Promise.resolve([]);
      }

      const dummyData = {
        id: 'demo-id',
        name: 'Demo User',
        phone: '0000000000',
        membershipCode: '123456',
        stamps: 0,
        role: 'CUSTOMER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return Promise.resolve(dummyData);
    },
  }) as any;
};

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not found. Using Mock Prisma Client for demo mode.');
    return createRecursiveProxy();
  }
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

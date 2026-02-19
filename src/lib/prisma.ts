import { PrismaClient } from '@prisma/client'

// In-memory store for demo mode
let customers: any[] = [];
let broadcasts: any[] = [];

// Recursive proxy to handle any level of nesting (e.g., prisma.customer.findUnique)
const createRecursiveProxy = (name: string = '', model: string = '') => {
  return new Proxy(() => {}, {
    get(target, prop) {
      if (prop === 'then') return undefined;
      if (prop === 'catch') return undefined;
      if (typeof prop === 'string') {
        // If we're at the top level (prisma.customer), we start tracking the model name
        const normalizedProp = prop.toLowerCase();
        let currentModel = model;
        if (['customer', 'broadcast'].includes(normalizedProp)) {
          currentModel = normalizedProp;
        }
        return createRecursiveProxy(prop, currentModel);
      }
      return undefined;
    },
    apply(target, thisArg, args) {
      if (!model) return Promise.resolve(null);

      const action = name;
      const data = args[0] || {};
      const targetStore = model === 'customer' ? customers : broadcasts;

      if (action === 'findMany') {
        return Promise.resolve([...targetStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      }

      if (action === 'findUnique' || action === 'findFirst') {
        const where = data.where || {};
        const item = targetStore.find(c => {
          if (where.phone && c.phone === where.phone) return true;
          if (where.membershipCode && c.membershipCode === where.membershipCode) return true;
          if (where.id && c.id === where.id) return true;
          return false;
        });
        return Promise.resolve(item || null);
      }

      if (action === 'create') {
        const newItem = {
          id: `demo-${Math.random().toString(36).substr(2, 9)}`,
          ...data.data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        if (model === 'customer') {
          newItem.coupons = newItem.coupons || 0;
          newItem.receivedFirstGift = newItem.receivedFirstGift || false;
          newItem.googleReviewStatus = newItem.googleReviewStatus || 'NONE';
          // Ensure membershipCode is unique in demo mode too
          if (!newItem.membershipCode) {
            newItem.membershipCode = Math.floor(100000 + Math.random() * 900000).toString();
          }
        }

        if (model === 'broadcast') {
          newItem.target = newItem.target || 'ALL';
        }

        targetStore.push(newItem);
        return Promise.resolve(newItem);
      }

      if (action === 'update') {
        const where = data.where || {};
        const index = targetStore.findIndex(c => {
          if (where.phone && c.phone === where.phone) return true;
          if (where.membershipCode && c.membershipCode === where.membershipCode) return true;
          if (where.id && c.id === where.id) return true;
          return false;
        });
        if (index !== -1) {
          targetStore[index] = { ...targetStore[index], ...data.data, updatedAt: new Date() };
          return Promise.resolve(targetStore[index]);
        }
        return Promise.reject(new Error(`${model} not found`));
      }

      if (action === 'deleteMany') {
        if (model === 'broadcast') {
          broadcasts = [];
        }
        return Promise.resolve({ count: 0 });
      }

      return Promise.resolve(null);
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

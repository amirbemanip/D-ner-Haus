import { PrismaClient } from '@prisma/client'

// In-memory store for demo mode
let customers: any[] = [];
let globalMessage = "";
let groupMessages: Record<string, string> = {}; // { groupId: message }

// Recursive proxy to handle any level of nesting (e.g., prisma.customer.findUnique)
const createRecursiveProxy = (name: string = '', model: string = '') => {
  return new Proxy(() => {}, {
    get(target, prop) {
      if (prop === 'then') return undefined;
      if (prop === 'catch') return undefined;
      if (typeof prop === 'string') {
        // Handle custom metadata for messages
        if (prop === 'getGlobalMessage') return () => Promise.resolve(globalMessage);
        if (prop === 'setGlobalMessage') return (msg: string) => { globalMessage = msg; return Promise.resolve(msg); };

        return createRecursiveProxy(prop, model || (['customer'].includes(prop.toLowerCase()) ? prop : ''));
      }
      return undefined;
    },
    apply(target, thisArg, args) {
      if (!model) return Promise.resolve(null);

      const action = name;
      const data = args[0] || {};

      if (action === 'findMany') {
        return Promise.resolve([...customers].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      }

      if (action === 'findUnique' || action === 'findFirst') {
        const where = data.where || {};
        const customer = customers.find(c => {
          if (where.phone && c.phone === where.phone) return true;
          if (where.membershipCode && c.membershipCode === where.membershipCode) return true;
          if (where.id && c.id === where.id) return true;
          return false;
        });

        if (customer) {
            // Append global message to the customer object for easy access
            return Promise.resolve({ ...customer, globalMessage });
        }
        return Promise.resolve(null);
      }

      if (action === 'create') {
        const existing = customers.find(c => c.phone === data.data.phone);
        if (existing) {
          return Promise.reject(new Error('P2002: Unique constraint failed on the fields: (`phone`)'));
        }

        const newCustomer = {
          id: `demo-${Math.random().toString(36).substr(2, 9)}`,
          ...data.data,
          stamps: 0,
          coupons: 0,
          receivedFirstGift: false,
          googleReviewPending: false,
          googleReviewClaimed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        // Ensure membershipCode is unique in demo mode too
        if (!newCustomer.membershipCode) {
           newCustomer.membershipCode = Math.floor(100000 + Math.random() * 900000).toString();
        }
        customers.push(newCustomer);
        return Promise.resolve(newCustomer);
      }

      if (action === 'update') {
        const where = data.where || {};
        const index = customers.findIndex(c => {
          if (where.phone && c.phone === where.phone) return true;
          if (where.membershipCode && c.membershipCode === where.membershipCode) return true;
          if (where.id && c.id === where.id) return true;
          return false;
        });
        if (index !== -1) {
          customers[index] = { ...customers[index], ...data.data, updatedAt: new Date() };
          return Promise.resolve(customers[index]);
        }
        return Promise.reject(new Error('Customer not found'));
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

import { initTRPC } from '@trpc/server';
import SuperJson from 'superjson';
import { createInnerTRPCContext } from './context';
import { prisma } from './prisma';

const t = initTRPC.context<typeof createInnerTRPCContext>().create({
  transformer: SuperJson,
});

export const router = t.router;
export const baseProcedure = t.procedure;

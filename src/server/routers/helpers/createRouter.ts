import * as trpc from "@trpc/server";

import type { Context } from '../../../../src/server/context';

import trpcOptions from '../../../../src/server/trpc';

export const t = trpc.initTRPC.context<Context>().create(trpcOptions);

export const publicProcedure = t.procedure;




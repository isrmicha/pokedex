import { baseProcedure, router as appRouterTrpc, } from '../trpc'
import { router, } from './router'

export const appRouter = appRouterTrpc({
  router,
  i18n: baseProcedure.query(({ ctx, }) => ({
    i18n: ctx.i18n,
    locale: ctx.locale,
  })),
})

export type AppRouter = typeof appRouter;

import { pokemonRouter } from "~/server/api/routers/pokemon";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pokemonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

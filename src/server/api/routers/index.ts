import { z, } from "zod"

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc"

export const router = createTRPCRouter({

  updateFavorite: publicProcedure.input(z.object({ id: z.string(), index: z.string(), favoritedIds: z.array(z.string()), }))
    .mutation(async ({ ctx, input, }) => {
      const { id, index, favoritedIds, } = input

      return ctx.prisma.favorites.upsert({
        where: {
          id,
        },
        update: {
          ids: favoritedIds.includes(index) ? favoritedIds.filter(name => name !== index) : [...favoritedIds, index,],
        },
        create: {
          id,
          ids: [index,],
        },
      })
    }),
  getFavorites: publicProcedure.input(z.object({ id: z.string(), }))
    .query
    (({ ctx, input, }) => {
      const { id, } = input
      return ctx.prisma.favorites.findUnique({ where: { id, }, })
    }),
})

import { z, } from "zod"
import { PAGE_SIZE } from "~/constants"

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc"
import { fetcher } from "~/services/fetcher"
import { ListPokemonsQuery, ListPokemonsQueryByIds } from "~/services/pokedex"

export const router = createTRPCRouter({
  getPokemons: publicProcedure.input(z.object({ offset: z.number().optional(), ids: z.array(z.string()).optional() })).
    query(async ({ input: { ids, offset } }) => {
      const data = await fetcher(ids ? ListPokemonsQueryByIds : ListPokemonsQuery, ids ? { ids } : { offset: offset || 0, limit: PAGE_SIZE })()
      return data
    }),
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



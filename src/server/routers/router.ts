import { z, } from 'zod'
import { baseProcedure, router as appRouter, } from '../trpc'
import { fetcher, } from '~/services/fetcher'
import { ListPokemonsQuery, ListPokemonsQueryByIds, } from '~/services/pokedex'
import { PAGE_SIZE, } from '~/constants'

export const router = appRouter({
  getPokemons: baseProcedure.input(z.object({ offset: z.number().optional(), ids: z.array(z.string()).optional(), })).
    query(async ({ input: { ids, offset, }, }) => {
      const data = await fetcher(ids ? ListPokemonsQueryByIds : ListPokemonsQuery, ids ? { ids, } : { offset: offset || 0, limit: PAGE_SIZE, })()
      return data
    }),
  updateFavorite: baseProcedure.input(z.object({ id: z.string(), index: z.string(), favoritedIds: z.array(z.string()).optional(), }))
    .mutation(async ({ ctx, input, }) => {
      const { id, index, favoritedIds = [], } = input

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
  getFavorites: baseProcedure.input(z.object({ id: z.string(), }))
    .query
    (({ ctx, input, }) => {
      const { id, } = input
      return ctx.prisma.favorites.findUnique({ where: { id, }, })
    }),
})

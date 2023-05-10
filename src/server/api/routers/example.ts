import { z, } from "zod"

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc"

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string(), }))
    .query(({ input, }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  getAll: publicProcedure.query(({ ctx, }) => {
    return ctx.prisma.example.findMany()
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!"
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
  getPokemons: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).nullish(),
      offset: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
    }))
    .query(async (opts) => {
      const { input, } = opts
      const { offset, limit, } = input
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      const items = await response.json()
      let nextOffset: typeof offset | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextOffset = nextItem.nextOffset
      }
      return {
        items,
        nextOffset,
      }
    }),
})

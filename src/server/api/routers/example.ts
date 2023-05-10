import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  updateFavorite: publicProcedure.input(z.object({ id: z.string(), pokemonName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(123123123132, input)
      const { id, pokemonName } = input
      const { names } = await ctx.prisma.favorites.findUnique({ where: { id } })
      return ctx.prisma.favorites.upsert({
        where: {
          id,
        },
        update: {
          names: names.includes(pokemonName) ? names.filter(name => name !== pokemonName) : [...names, pokemonName],
        },
        create: {
          id,
          names: [pokemonName]
        },
      })
    }),
  getFavorites: publicProcedure.input(z.object({ id: z.string() }))
    .query
    (({ ctx, input }) => {
      const { id } = input
      return ctx.prisma.favorites.findUnique({ where: { id: id } })
    }),
  getPokemons: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).nullish(),
      offset: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
    }))
    .query(async (opts) => {
      const { input } = opts;
      const limit = input.limit ?? 50;
      const { offset } = input;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`)
      const items = await response.json()
      let nextOffset: typeof offset | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop()
        nextOffset = nextItem.nextOffset;
      }
      return {
        items,
        nextOffset,
      };
    })
});

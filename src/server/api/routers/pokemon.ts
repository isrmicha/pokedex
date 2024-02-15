import { z } from "zod";
import { PAGE_SIZE } from "~/constants";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { fetcher } from "~/services/fetcher";
import { ListPokemonsQuery, ListPokemonsQueryByIds } from "~/services/pokedex";

export const pokemonRouter = createTRPCRouter({
    getPokemons: publicProcedure.input(z.object({ offset: z.number().optional(), ids: z.array(z.string()).optional(), limit: z.number().optional(), })).
        query(async ({ input: { ids, offset, limit }, }) => {
            const data = await fetcher(ids ? ListPokemonsQueryByIds : ListPokemonsQuery, ids ? { ids, } : { offset: offset ?? 0, limit: limit ?? PAGE_SIZE, })()
            return data
        }),
});

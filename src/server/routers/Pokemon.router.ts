import { t, publicProcedure } from "./helpers/createRouter";
import { z } from "zod";
import { PAGE_SIZE } from "~/constants";
import { fetcher } from "~/services/fetcher";
import { ListPokemonsQueryByIds, ListPokemonsQuery } from "~/services/pokedex";

export const pokemonsRouter = t.router({

    getPokemons: publicProcedure.input(z.object({ offset: z.number().optional(), ids: z.array(z.string()).optional(), })).
        query(async ({ input: { ids, offset, }, }) => {
            const data = await fetcher(ids ? ListPokemonsQueryByIds : ListPokemonsQuery, ids ? { ids, } : { offset: offset || 0, limit: PAGE_SIZE, })()
            return data
        }),
})




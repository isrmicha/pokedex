import React from "react";
import { Table } from "./table";
import { api } from "~/trpc/server";


export const TableWrapper = async ({ pageSize, pageIndex, session }) => {
  const favorites = session?.user.favorites
  const pokemons = await api.pokemonRouter.getPokemons.query({ limit: Number(pageSize), offset: Number(pageIndex * pageSize) })
  const pokemonsWithIsFavorite = pokemons.items.map((item) => {
    item.isFavorite = favorites?.includes(`${item.id}`);
    return item;
  });
  return <Table pokemons={pokemonsWithIsFavorite} session={session} />
}


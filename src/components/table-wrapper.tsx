import React from "react";
import { Table } from "./table";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";


export const TableWrapper = async ({ pageSize, pageIndex }: {pageSize: number, pageIndex: number}) => {
  const session = await getServerAuthSession();

  const favorites = session?.user.favorites
  const pokemons = await api.pokemonRouter.getPokemons.query({ limit: Number(pageSize), offset: Number(pageIndex * pageSize) })
  const pokemonsWithIsFavorite = pokemons.items.map((item) => {
    item.isFavorite = favorites?.includes(`${item.id}`);
    return item;
  });
  return <Table pokemons={pokemonsWithIsFavorite} session={session} />
}


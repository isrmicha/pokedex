import React from "react";
import { Table } from "./table";
import { api } from "~/trpc/server";


export const TableWrapper = async ({ pageSize, pageIndex }: {pageSize: number, pageIndex: number}) => {
  const pokemons = await api.pokemonRouter.getPokemons.query({ limit: Number(pageSize), offset: Number(pageIndex * pageSize) })
  return <Table pokemons={pokemons} />
}


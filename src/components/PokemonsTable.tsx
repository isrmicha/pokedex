import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Chip,
  Stack,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LIMIT_PER_PAGE, POKEMONS_QUERY_KEY } from "../constants/query";
import {
  getPokemonsQuery,
  useInfinitePokemonsListQuery,
} from "../querys/pokedex";
import { Pokemon } from "../types/pokemon";
import { getPokemonImage } from "../utils/image";
import { InfiniteScrollListVirtualized } from "./InfiniteScrollListVirtualized";
import { Loading } from "./Loading";
import { StyledTableRow, StyledTableCell } from "./Table.style";

export const PokemonsTable = ({
  setSelectedPokemonId,
}: {
  setSelectedPokemonId: Dispatch<SetStateAction<null | number>>;
}) => {
  return (
    <InfiniteScrollListVirtualized
      controllerQuery={useInfinitePokemonsListQuery}
      itemComponent={PokemonRow}
      setSelectedPokemonId={setSelectedPokemonId}
      itemSize={56}
    />
  );
};

const PokemonRow = ({ id, name, sprites, types, setSelectedPokemonId }) => (
  <Paper elevation={2} onClick={() => setSelectedPokemonId(id)}>
    <Grid container alignItems="center">
      <Grid xs={2} key={id}>
        #{id}
      </Grid>
      <Grid xs={3}>{name}</Grid>
      <Grid xs={4}>
        <Image
          src={getPokemonImage(sprites)}
          alt="pokemon"
          width={50}
          height={50}
        />
      </Grid>
      <Grid xs={3}>
        <Stack direction="row" spacing={1}>
          {types.map(({ type: { name } }) => (
            <Chip key={name} label={name} color="default" />
          ))}
        </Stack>
      </Grid>
    </Grid>
  </Paper>
);

import { Paper, Chip, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useInfinitePokemonsListQuery } from "../querys/pokemon";
import { getPokemonImage } from "../utils/image";
import { InfiniteScrollListVirtualized } from "./InfiniteScrollListVirtualized";

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

const PokemonRow = ({
  id,
  name,
  sprites,
  types,
  setSelectedPokemonId,
}: {
  id: number;
  name: string;
  sprites: string[];
  types: { type: { name: string } }[];
  setSelectedPokemonId: Dispatch<SetStateAction<null | number>>;
}) => (
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

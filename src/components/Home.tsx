import { Suspense, lazy, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { POKEAPI_ENDPOINT, POKEMONS_QUERY_KEY } from "../constants/query";
import { getPokemonsQuery } from "../querys/pokedex";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { PokemonsTable } from "./PokemonsTable";
import { ModalPokemon } from "./ModalPokemon";

// const ModalPokemon = lazy(
//   () => import(/* webpackChunkName: "ModalPokemon" */ "./ModalPokemon")
// );
// const CardGrid = lazy(
//   () => import(/* webpackChunkName: "CardGrid" */ "./CardGrid")
// );

const Home = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  return (
    <>
      <PokemonsTable setSelectedPokemonId={setSelectedPokemonId} />
      {selectedPokemonId && (
        <ModalPokemon
          selectedPokemonId={selectedPokemonId}
          setSelectedPokemonId={setSelectedPokemonId}
        />
      )}
    </>
  );
};

export default Home;

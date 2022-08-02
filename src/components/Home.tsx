import { useState } from "react";
import { PokemonsTable } from "./PokemonsTable";
import { ModalPokemon } from "./ModalPokemon";

// const ModalPokemon = lazy(
//   () => import(/* webpackChunkName: "ModalPokemon" */ "./ModalPokemon")
// );
// const CardGrid = lazy(
//   () => import(/* webpackChunkName: "CardGrid" */ "./CardGrid")
// );

const Home = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<null | number>(
    null
  );

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

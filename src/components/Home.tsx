import { useState } from "react";
import { PokemonsTable } from "./PokemonsTable";
import { ModalPokemon } from "./ModalPokemon";

const Home = ({ initialPokemons }) => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<null | number>(
    null
  );

  return (
    <>
      <PokemonsTable
        setSelectedPokemonId={setSelectedPokemonId}
        initialPokemons={initialPokemons}
      />
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

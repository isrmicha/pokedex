import { useState } from "react";
import { PokemonsTable } from "./PokemonsTable";
import { ModalPokemon } from "./ModalPokemon";

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

import {
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { POKEMON_CRY_URL } from "../constants/pokemon";
import { POKEMON_QUERY_KEY } from "../constants/query";
import { getPokemonQuery, usePokemonQuery } from "../querys/pokedex";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalPokemon = ({
  selectedPokemonId,
  setSelectedPokemonId,
}: {
  selectedPokemonId: number;
  setSelectedPokemonId: (arg0: number | null) => void;
}) => {
  const {
    isLoading,
    error,
    data: pokemon,
  } = usePokemonQuery(selectedPokemonId);
  useEffect(() => {
    const audio = new Audio(`${POKEMON_CRY_URL}${selectedPokemonId}.mp3`);
    audio.play();
  }, [selectedPokemonId]);
  return (
    <Modal open={true} onClose={() => setSelectedPokemonId(null)}>
      <Box sx={style}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {pokemon.id}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {pokemon.name}
            </Typography>
            <img
              src={JSON.parse(pokemon.sprites?.[0]?.sprites)?.front_default}
            />
            <Button
              variant="contained"
              disabled={selectedPokemonId === 1}
              onClick={() =>
                selectedPokemonId > 1 &&
                setSelectedPokemonId(selectedPokemonId - 1)
              }
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={() => setSelectedPokemonId(selectedPokemonId + 1)}
            >
              Avançar
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

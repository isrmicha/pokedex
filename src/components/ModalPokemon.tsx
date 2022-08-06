import {
  Button,
  Box,
  Typography,
  Dialog,
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { POKEMON_CRY_URL } from "../constants/pokemon";
import { usePokemonQuery } from "../querys/pokedex";
import { getPokemonImage } from "../utils/image";
import { toNormalCase } from "../utils/string";
import { Loading } from "./Loading";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Pokemon } from "../types/pokemon";

let audio: HTMLAudioElement | null = null;

export const ModalPokemon = ({
  selectedPokemonId,
  setSelectedPokemonId,
}: {
  selectedPokemonId: number;
  setSelectedPokemonId: Dispatch<SetStateAction<null | number>>;
}) => {
  const {
    isLoading,
    error,
    data: pokemon,
  } = usePokemonQuery(selectedPokemonId);

  const handlePlayCry = () => {
    audio?.pause();
    audio = new Audio(`${POKEMON_CRY_URL}${selectedPokemonId}.mp3`);
    audio.play();
  };
  const handleClose = () => setSelectedPokemonId(null);
  return (
    <Dialog open={true} onClose={handleClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                #{pokemon.id}
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {toNormalCase(pokemon.name)}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        {error ? (
          <div>Aconteceu algo errado...</div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <Grid container direction="row">
              <Grid item>
                <Button
                  variant="contained"
                  disabled={selectedPokemonId === 1}
                  onClick={() =>
                    selectedPokemonId > 1 &&
                    setSelectedPokemonId(selectedPokemonId - 1)
                  }
                >
                  <ArrowBackIcon />
                </Button>
              </Grid>
              <Grid item>
                <img src={getPokemonImage(pokemon.sprites)} />
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  component="label"
                  onClick={handlePlayCry}
                >
                  <VolumeUpIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={1}>
                  {(pokemon as Pokemon).types.map(({ type: { name } }) => (
                    <Chip label={name} color="default" />
                  ))}
                </Stack>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => setSelectedPokemonId(selectedPokemonId + 1)}
                >
                  <ArrowForwardIcon />
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Dialog>
  );
};
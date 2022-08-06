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
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { POKEMON_CRY_URL } from "../constants/pokemon";
import { usePokemonQuery } from "../querys/pokedex";
import { getPokemonImage } from "../utils/image";
import { Loading } from "./Loading";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Pokemon } from "../types/pokemon";
import { padding } from "@mui/system";
import { StyledTableRow, StyledTableCell } from "./Table.style";

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
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant="h6"
                component="div"
                textTransform={"capitalize"}
              >
                {pokemon.name}
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
        ) : (
          <>
            <Paper elevation={3} variant="outlined" square sx={{ padding: 5 }}>
              <Grid container direction="row" display={"flex"}>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <Grid
                      item
                      xs={3}
                      justifyContent="center"
                      alignContent={"center"}
                      display={"flex"}
                    >
                      <Button
                        variant="outlined"
                        disabled={selectedPokemonId === 1}
                        onClick={() =>
                          selectedPokemonId > 1 &&
                          setSelectedPokemonId(selectedPokemonId - 1)
                        }
                      >
                        <ArrowBackIcon />
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      justifyContent="center"
                      alignContent={"center"}
                      display={"flex"}
                    >
                      <img src={getPokemonImage(pokemon.sprites)} />
                    </Grid>

                    <Grid
                      item
                      xs={3}
                      justifyContent="center"
                      alignContent={"center"}
                      display={"flex"}
                    >
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setSelectedPokemonId(selectedPokemonId + 1)
                        }
                      >
                        <ArrowForwardIcon />
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Property</StyledTableCell>
                    <StyledTableCell>Value</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Sound
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <IconButton
                          color="primary"
                          component="label"
                          onClick={handlePlayCry}
                        >
                          <VolumeUpIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Types
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Stack direction="row" spacing={1}>
                          {(pokemon as Pokemon)?.types.map(
                            ({ type: { name } }) => (
                              <Chip label={name} color="default" />
                            )
                          )}
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Dialog>
  );
};

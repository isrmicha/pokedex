import {
  Paper,
  Chip,
  Stack,
  Unstable_Grid2 as Grid,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { styled } from "@stitches/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { IS_MOBILE_MEDIA_QUERY } from "../constants/media-query";
import { useInfinitePokemonsListQuery } from "../querys/pokemon";
import theme from "../theme";
import { getPokemonImage } from "../utils/image";
import { InfiniteScrollListVirtualized } from "./InfiniteScrollListVirtualized";

export const PokemonsTable = ({
  setSelectedPokemonId,
}: {
  setSelectedPokemonId: Dispatch<SetStateAction<null | number>>;
}) => {
  const isMobile = useMediaQuery(IS_MOBILE_MEDIA_QUERY);

  return (
    <Container sx={{ paddingTop: isMobile ? 0 : 5 }}>
      <StyledGrid container alignItems="center">
        <Grid xs={2}>ID</Grid>
        <Grid xs={3}>Name</Grid>
        <Grid xs={isMobile ? 2 : 4}>
          <Typography>Sprite</Typography>
        </Grid>
        <Grid xs={3}>
          <Typography>Types</Typography>
        </Grid>
      </StyledGrid>

      <InfiniteScrollListVirtualized
        controllerQuery={useInfinitePokemonsListQuery}
        itemComponent={PokemonRow}
        setSelectedPokemonId={setSelectedPokemonId}
        itemSize={56}
      />
    </Container>
  );
};

const PokemonRow = ({
  id,
  name,
  sprites,
  types,
  setSelectedPokemonId,
  index,
}: {
  index: number;
  id: number;
  name: string;
  sprites: string[];
  types: { type: { name: string } }[];
  setSelectedPokemonId: Dispatch<SetStateAction<null | number>>;
}) => {
  const isMobile = useMediaQuery(IS_MOBILE_MEDIA_QUERY);

  return (
    <>
      <Paper
        elevation={2}
        onClick={() => setSelectedPokemonId(id)}
        style={{ cursor: "pointer" }}
        className="ListItem"
      >
        <Grid container alignItems="center">
          <StyledGridItem xs={2} key={id}>
            #{id}
          </StyledGridItem>
          <StyledGridItem xs={3}>{name}</StyledGridItem>
          <Grid xs={isMobile ? 2 : 4}>
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
    </>
  );
};

const StyledGrid = styled(Grid, {
  padding: "15px",
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
});

const StyledGridItem = styled(Grid, {
  paddingLeft: "10px",
  textTransform: "capitalize",
});

'use client'

import { startCase } from "lodash";
import { getPokemonImage } from "~/utils/image";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Drawer,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { api } from "~/trpc/react";
import { updateUserFavorite } from "~/app/actions";

const FavoriteDrawer = ({ session, isFavoriteOpen, setIsFavoriteOpen, update }) => {
  const favorites = session?.user?.favorites
  const { data: pokemons } = api.pokemonRouter.getPokemons.useQuery({
    ids: favorites,
  });

  const handleClickFavorite = async (id: string) => {
    await updateUserFavorite(id)
    await update()
  }
  return (
    <Drawer anchor="right" open={true} onClose={() => setIsFavoriteOpen(!isFavoriteOpen)}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {pokemons?.items?.map(({ id, name }) => (
          <ListItem key={id}>
            <ListItemAvatar >
              <Avatar variant="square" src={getPokemonImage(id)} slotProps={{
                img: {
                  sx: {
                    objectFit: "contain",
                  }
                }
              }} />
            </ListItemAvatar>
            <ListItemText primary={startCase(name)} secondary={`#${id}`} />
            <div>
              <IconButton
                disabled={!session}
                aria-label="favorites"
                onClick={() => handleClickFavorite(`${id}`)}
              >
                <FavoriteIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default FavoriteDrawer;

import { startCase } from "lodash";
import { getPokemonImage } from "~/utils/image";
import { trpc } from "~/utils/trpc";
import { Loading } from "./loading";
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

const FavoriteDrawer = ({
  onClose,
  favorites,
  updateUser,
  handleClickFavorite,
  isLogged,
}: any) => {
  const { data: pokemons } = trpc.pokemon.getPokemons.useQuery({
    ids: favorites,
  });

  return (
    <Drawer anchor="right" open={true} onClose={() => onClose(false)}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {pokemons?.items?.map(({ id, name }) => (
          <ListItem key={id}>
            <ListItemAvatar>
              <Avatar variant="square" src={getPokemonImage(id)} />
            </ListItemAvatar>
            <ListItemText primary={startCase(name)} secondary={`#${id}`} />
            <div>
              {updateUser.isLoading ? (
                <Loading />
              ) : (
                <IconButton
                  disabled={!isLogged}
                  aria-label="favorites"
                  onClick={() => handleClickFavorite(`${id}`)}
                >
                  <FavoriteIcon style={{ color: "red" }} />
                </IconButton>
              )}
            </div>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default FavoriteDrawer;

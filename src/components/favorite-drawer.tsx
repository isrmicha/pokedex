import { startCase } from "lodash"
import { getPokemonImage } from "~/utils/image"
import { trpc, } from "~/utils/trpc"
import { Loading } from "./loading"
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, List, Drawer } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';

export const FavoriteDrawer = ({ onClose, favorites, updateUser, handleClickFavorite }: any) => {
    const { data: pokemons, } = trpc.pokemon.getPokemons.useQuery(
        { ids: favorites, }
    )

    return <Drawer
        anchor="right"
        open={true}
        onClose={() => onClose(false)}
    >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {pokemons?.items?.map(({ id, name }) => (
                <ListItem key={id}>
                    <ListItemAvatar>
                        <Avatar shape="square" src={getPokemonImage(id)} />
                    </ListItemAvatar>
                    <ListItemText primary={startCase(name)} secondary={`#${id}`} />
                    <div>
                        {updateUser.isLoading ? <Loading /> :
                            (
                                <IconButton aria-label="favorites" onClick={() => handleClickFavorite(`${id}`)} >
                                    <FavoriteIcon />
                                </IconButton>
                            )}
                    </div>
                </ListItem>
            ))}
        </List>
    </Drawer>
}
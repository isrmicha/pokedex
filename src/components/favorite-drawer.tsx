import { Drawer, } from "antd"
import { api, } from "~/utils/api"



export const FavoriteDrawer = ({ onClose, open,favoritedIds,}: any) => {
    const { data: pokemons } = api.router.getPokemons.useQuery(
        { ids: favoritedIds?.ids, }
    )

    return <Drawer title="Favorites" placement="right" onClose={() => onClose(false)} open={open}>
        {pokemons?.items.map(({id, name,})=> <p key={id}>{id} - {name}</p>)}
    </Drawer>
}
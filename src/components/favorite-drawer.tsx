import { Drawer, } from "antd"
import { trpc, } from "~/utils/trpc"

export const FavoriteDrawer = ({ onClose, open,favoritedIds,}: any) => {
    const { data: pokemons, } = trpc.router.getPokemons.useQuery(
        { ids: favoritedIds?.ids, }
    )

    return <Drawer title="Favorites" placement="right" onClose={() => onClose(false)} open={open}>
        {pokemons?.items.map(({id, name,})=> <p key={id}>{id} - {name}</p>)}
    </Drawer>
}
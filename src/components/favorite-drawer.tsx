import { Drawer, } from "antd"
import { trpc, } from "~/utils/trpc"

export const FavoriteDrawer = ({ onClose, favoritedIds,}: any) => {
    const { data: pokemons, } = trpc.router.getPokemons.useQuery(
        { ids: favoritedIds?.ids, }
    )

    return <Drawer title="Favorites" placement="right" open={true} onClose={() => onClose(false)}>
        {pokemons?.items.map(({id, name,})=> <p key={id}>{id} - {name}</p>)}
    </Drawer>
}
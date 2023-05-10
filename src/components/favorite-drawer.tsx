import { Drawer, } from "antd"
import { useSession, } from "next-auth/react"
import { PAGE_SIZE, } from "~/constants"
import { useInfinitePokemonsListQuery, } from "~/services/pokedex"
import { api, } from "~/utils/api"



export const FavoriteDrawer = ({ onClose, open,}: any) => {
    const { data, } = useSession()
    const favoritedIds = api.router.getFavorites.useQuery({ id: data?.user.id, }, { enabled: !!data?.user.id, })

    const { data: pokemons, isFetching, } = useInfinitePokemonsListQuery(
        "offset",
        { ids: favoritedIds?.data?.ids, }
    )

    return <Drawer title="Favorites" placement="right" onClose={() => onClose(false)} open={open}>
        {pokemons?.pages?.[0]?.items.map(({id, name,})=> <p key={id}>{id} - {name}</p>)}
    </Drawer>
}
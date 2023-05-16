import { Drawer, Image, } from "antd"
import { startCase } from "lodash"
import { getPokemonImage } from "~/utils/image"
import { trpc, } from "~/utils/trpc"

export const FavoriteDrawer = ({ onClose, favoritedIds,}: any) => {
    const { data: pokemons, } = trpc.router.getPokemons.useQuery(
        { ids: favoritedIds?.ids, }
    )

    return <Drawer title="Favorites" placement="right" open={true} onClose={() => onClose(false)}>
        {pokemons?.items.map(({id, name})=> <p key={id}><Image src={getPokemonImage(id)} width={25} height={25} preview={false} /> #{id} - {startCase(name)}</p>)}
    </Drawer>
}
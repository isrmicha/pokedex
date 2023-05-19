import { HeartTwoTone } from "@ant-design/icons"
import { Avatar, Drawer, List, Space, } from "antd"
import { startCase } from "lodash"
import Image from "next/image"
import { record } from "zod"
import { getPokemonImage } from "~/utils/image"
import { trpc, } from "~/utils/trpc"
import { Loading } from "./loading"

export const FavoriteDrawer = ({ onClose, favorites, updateUser, handleClickFavorite }: any) => {
    const { data: pokemons, } = trpc.pokemon.getPokemons.useQuery(
        { ids: favorites, }
    )

    return <Drawer title="Favorites" placement="right" open={true} onClose={() => onClose(false)}>
        <List
            itemLayout="horizontal"
            dataSource={pokemons?.items}
            renderItem={({ id, name }) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar shape="square" src={getPokemonImage(id)} />}
                        title={startCase(name)}
                        description={`#${id}`}
                    />
                    <div>
                        {updateUser.isLoading ? <Loading /> :
                            (<Space size="middle" style={{ cursor: 'pointer', }} onClick={() => handleClickFavorite(`${id}`)}>
                                <HeartTwoTone twoToneColor={"red"} />
                            </Space>)}
                    </div>
                </List.Item>
            )}
        />
    </Drawer>
}
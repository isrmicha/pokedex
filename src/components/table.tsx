import React, { useState, } from 'react'
import { Space, Tag, Table as _Table, } from 'antd'
import type { ColumnsType, } from 'antd/es/table'
import { PAGE_SIZE, TOTAL_POKEMON_COUNT, } from '~/constants'
import {
    HeartTwoTone,
} from '@ant-design/icons'
import { getPokemonImage, } from '~/utils/image'
import { startCase, } from 'lodash'
import { Loading, } from './loading'
import { trpc, } from "~/utils/trpc"
import Image from 'next/image'

export const Table = ({ favoritedIds, sessionData, isLoadingFavoritedIds, }: {
    favoritedIds: string[],
    sessionData: any,
    isLoadingFavoritedIds: boolean,
}) => {
    const [page, setPage,] = useState<number>(0)
    const upsertOneFavorite = trpc.favorite.upsertOne.useMutation()
    const { invalidate, } = trpc.useContext()
    const { data: pokemons, isFetching, } = trpc.pokemon.getPokemons.useQuery({ offset: page * PAGE_SIZE, }, {
        ...(favoritedIds ? {
            select(data) {
                data.items = data?.items.map((item) => {
                    item.isFavorite = favoritedIds?.includes(`${item.id}`)
                    return item
                })
                return data
            },
        } : {}),
    })
    const isLoadingFavorites = isLoadingFavoritedIds || upsertOneFavorite.isLoading
    const handleClickFavorite = async (id: string) => {
        const pokemonIds = !!favoritedIds ? favoritedIds?.includes(id) ? favoritedIds?.filter(pokemonId => pokemonId !== id) : [...favoritedIds, id,] : [id,]
        await upsertOneFavorite.mutateAsync(
            {
                create: { id: sessionData?.user?.id, pokemonIds, },
                update: { pokemonIds },
                where: { id: sessionData?.user?.id }
            }
        )
        await invalidate()
    }
    const handleChangePage = (page: number) => setPage(page - 1)
    const handleOnErrorImage = (id, event, sprites) => {
        event.target.src = getPokemonImage(id, true, sprites)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
            render: (_, record) => <Tag>#{record?.id}</Tag>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (text) => <Tag>
                {startCase(text)}
            </Tag>,
        },
        {
            title: 'Image',
            key: 'sprites',
            dataIndex: 'sprites',
            ellipsis: true,
            render: (_, record) => (
                <Image alt={record.name} src={getPokemonImage(record.id)} width={50} height={50}
                    onError={event => handleOnErrorImage(record.id, event, record.sprites)}
                />
            ),
        },
        {
            title: 'Favorite',
            key: 'action',
            dataIndex: 'action',
            ellipsis: true,
            render: (_, record) =>
                isLoadingFavorites ? (<Loading />) : (
                    <Space size="middle" style={{ cursor: 'pointer', }} onClick={() => handleClickFavorite(`${record?.id}`)}>
                        <HeartTwoTone twoToneColor={record.isFavorite ? "red" : 'grey'} />
                    </Space>
                ),
        },
    ]
    return <_Table
        bordered
        pagination={{
            pageSize: PAGE_SIZE, current: page + 1,
            onChange: handleChangePage,
            total: TOTAL_POKEMON_COUNT,
            showSizeChanger: false,
        }}
        loading={{ spinning: isFetching, indicator: <Loading />, }}
        columns={columns} dataSource={pokemons?.items}
        showHeader={false}
        rowKey="id"

    />
}


import React, { useState, } from 'react'
import { Space, Tag, Table as _Table, } from 'antd'
import type { ColumnsType, } from 'antd/es/table'
import { api, } from '~/utils/api'
import { PAGE_SIZE, TOTAL_POKEMON_COUNT, } from '~/constants'
import {
    HeartTwoTone,
} from '@ant-design/icons'
import { getPokemonImage, } from '~/utils/image'
import { startCase, } from 'lodash'
import { Loading, } from './loading'
import { trpc, } from "~/utils/trpc"
import Image from 'next/image'

export const Table = ({ favoritedIds, sessionData, isLoadingFavoritedIds, }) => {
    const [page, setPage,] = useState<number>(0)
    const updateFavorites = trpc.updateFavorite.useMutation()
    const { invalidate, } = trpc.useContext()
    const { data: pokemons, isFetching, } = trpc.getPokemons.useQuery({ offset: page * PAGE_SIZE, }, {
        ...(favoritedIds ? {
            select(data) {
                data.items = data?.items.map((item) => {
                    item.isFavorite = favoritedIds?.ids?.includes(`${item.id}`)
                    return item
                })
                return data
            },
        } : {}),
    })
    const isLoadingFavorites = isLoadingFavoritedIds || updateFavorites.isLoading
    const handleClickFavorite = async (id) => {
        await updateFavorites.mutateAsync({ id: sessionData?.user.id, index: `${id}`, favoritedIds: favoritedIds?.ids, })
        await invalidate(["router", "getFavorites",])
    }
    const handleChangePage = page => setPage(page - 1)
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
                    <Space size="middle" style={{ cursor: 'pointer', }} onClick={() => handleClickFavorite(record?.id)}>
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


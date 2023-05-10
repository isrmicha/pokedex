import React, { useState, } from 'react'
import { Image, Space, Tag, Table as _Table, } from 'antd'
import type { ColumnsType, } from 'antd/es/table'
import { api, } from '~/utils/api'
import { PAGE_SIZE, TOTAL_POKEMON_COUNT, } from '~/constants'
import {
    HeartTwoTone,
} from '@ant-design/icons'
import { useSession, } from 'next-auth/react'
import { useInfinitePokemonsListQuery, } from '~/services/pokedex'
import { getPokemonImage, } from '~/utils/image'
import { startCase, } from 'lodash'

export const Table: React.FC = () => {
    const [page, setPage,] = useState<number>(0)
    const { data, } = useSession()
    const favoritedIds = api.example.getFavorites.useQuery({ id: data?.user.id, }, { enabled: !!data?.user.id, })
    const updateFavorites = api.example.updateFavorite.useMutation()
    const { data: pokemons, isFetching, } = useInfinitePokemonsListQuery(
        "offset",
        { offset: page * PAGE_SIZE, limit: PAGE_SIZE, },
        {
            getNextPageParam(lastPage) {
                return {
                    offset: lastPage.items[lastPage.items.length - 1].id + PAGE_SIZE,
                    limit: PAGE_SIZE,
                }
            },
            ...(favoritedIds?.data ? {
                select(data) {
                    data.pages[0].items = data?.pages?.[0].items.map((item) => {
                        item.isFavorite = favoritedIds?.data?.ids?.includes(`${item.id}`)
                        return item
                    })
                    return data
                },
            } : {}),

        }
    )
    const isLoading = favoritedIds.isFetching || isFetching || updateFavorites.isLoading
    const handleClickFavorite = async (id) => {
        await updateFavorites.mutateAsync({ id: data?.user.id, index: `${id}`, favoritedIds: favoritedIds?.data?.ids, })
        await favoritedIds.refetch()
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
            render: (_, record) => <Tag>#{record?.id}</Tag>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Tag>
                {startCase(text)}
            </Tag>,
        },
        {
            title: 'Image',
            key: 'sprites',
            dataIndex: 'sprites',
            render: (_, record) => (
                <Image alt={record.name} src={getPokemonImage(record.id)} width={50} height={50}
                    onError={event => handleOnErrorImage(record.id, event, record.sprites)}
                    preview={{
                        width: 200,
                        height: 200,
                    }}
                />
            ),
        },
        {
            title: 'Favorite',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
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
        loading={isLoading}
        columns={columns} dataSource={pokemons?.pages?.[0]?.items}
        showHeader={false}
    />
}


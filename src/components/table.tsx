import React from 'react';
import { Space, Table as _Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { api } from '~/utils/api';
import { PAGE_SIZE } from '~/constants/idex';
import {
    HeartTwoTone
} from '@ant-design/icons';
import { useSession } from 'next-auth/react';

export const Table: React.FC = () => {
    const { data } = useSession()
    const favoritedIds = api.example.getFavorites.useQuery({ id: data?.user.id }, { enabled: !!data?.user.id })
    const updateFavorites = api.example.updateFavorite.useMutation({})
    const pokemons = api.example.getPokemons.useQuery({ offset: 0 }, {
        ...(favoritedIds?.data ? {
            select(data) {
                data.items.results = data.items.results.map((item, index) => {
                    item.index = index
                    item.isFavorite = favoritedIds?.data?.ids?.includes(`${index}`)
                    return item
                })
                return data
            },
        } : {}),
    })
    const isLoading = favoritedIds.isFetching || pokemons.isFetching || updateFavorites.isLoading
    const handleClickFavorite = async (index) => {
        await updateFavorites.mutateAsync({ id: data?.user.id, index: `${index}` })
        await favoritedIds.refetch()
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Action',
            key: 'action',
            render: (index, record) => (

                <Space size="middle" style={{ cursor: 'pointer' }} onClick={() => handleClickFavorite(record?.index)}>
                    <HeartTwoTone twoToneColor={record.isFavorite ? "red" : 'grey'} />
                </Space>

            ),
        }

    ];

    return <_Table bordered pagination={{ pageSize: PAGE_SIZE }} loading={isLoading}
        columns={columns} dataSource={pokemons?.data?.items?.results} />
}


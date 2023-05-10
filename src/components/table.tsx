import React, { useState } from 'react';
import { Space, Table as _Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { api } from '~/utils/api';
import { PAGE_SIZE } from '~/constants/idex';
import {
    HeartTwoTone
} from '@ant-design/icons';
import { useSession } from 'next-auth/react';

export const Table: React.FC = () => {
    const [page, setPage] = useState<number>(0)
    const { data } = useSession()
    const favoritedIds = api.example.getFavorites.useQuery({ id: data?.user.id }, { enabled: !!data?.user.id })
    const updateFavorites = api.example.updateFavorite.useMutation({})
    const pokemons = api.example.getPokemons.useQuery({ offset: page * PAGE_SIZE }, {
        ...(favoritedIds?.data ? {
            select(data) {
                data.items.results = data.items.results.map((item, index) => {
                    const fixedIndex = (page * PAGE_SIZE) + index
                    item.index = fixedIndex
                    item.isFavorite = favoritedIds?.data?.ids?.includes(`${fixedIndex}`)
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
    const handleChangePage = page => setPage(page - 1)
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

    return <_Table
        bordered
        pagination={{
            pageSize: PAGE_SIZE, current: page + 1,
            onChange: handleChangePage,
            total: pokemons.data?.items?.count,
            showSizeChanger: false

        }} loading={isLoading}
        columns={columns} dataSource={pokemons?.data?.items?.results} />
}


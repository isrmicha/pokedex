import React, { useMemo, useState, } from 'react'
import { PAGE_SIZE, TOTAL_POKEMON_COUNT, fallbackImage, } from '~/constants'
import { getPokemonImage, } from '~/utils/image'
import { startCase, } from 'lodash'
import { Loading, } from './loading'
import { trpc, } from "~/utils/trpc"
import Image from 'next/image'
import { Chip, IconButton } from '@mui/material'
import MaterialReactTable, { MRT_PaginationState } from 'material-react-table';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Table = ({ favorites, updateUser, isLoadingFavoritedIds, handleClickFavorite, isLogged }) => {
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const { data: pokemons, isFetching } = trpc.pokemon.getPokemons.useQuery({
        offset:
            pagination.pageIndex * pagination.pageSize,
        limit: pagination.pageSize,
    }, {
        ...(favorites ? {
            select(data) {
                data.items = data?.items.map((item) => {
                    item.isFavorite = favorites?.includes(`${item.id}`)
                    return item
                })
                return data
            },
        } : {}),
    })
    const isLoadingFavorites = isLoadingFavoritedIds || updateUser.isLoading

    const columns = useMemo(() => [
        {
            accessorKey: 'id', //access nested data with dot notation
            header: 'ID',
            key: "id",
            Cell: ({ cell }) => {
                return <Chip label={`#${cell.getValue?.()}`} />
            },
        },
        {
            accessorKey: 'name',
            header: 'Name',
            key: "name",
            Cell: ({ cell }) => {
                return <Chip label={cell.getValue?.()} />
            },
        },
        {
            header: 'Image',
            accessorKey: 'id_image',
            key: "image",

            Cell: ({ cell }) => {
                const imageSrc = getPokemonImage(cell.row.original.id)
                return <Image alt={imageSrc} src={imageSrc} width={50} height={50}
                />
            }

        },
        {
            header: 'Favorite',
            accessorKey: 'id_favorite',
            key: "favorite",
            Cell: ({ cell }) => {
                return isLoadingFavorites ? (<Loading />) :
                    (<IconButton disabled={!isLogged} aria-label="favorites" onClick={() => handleClickFavorite(`${cell.row.original.id}`)}>
                        <FavoriteIcon style={{ color: cell.row.original.isFavorite ? "red" : "unset" }} />
                    </IconButton>)
            },
        }
    ], [isLoadingFavorites])

    return <MaterialReactTable columns={columns}
        data={pokemons?.items ?? []}
        enablePagination
        manualPagination
        onPaginationChange={setPagination}
        state={{ isLoading: isFetching && !pokemons?.items?.length, pagination }}
        muiTableBodyCellSkeletonProps={{ width: '100%', height: 55 }}
        rowCount={TOTAL_POKEMON_COUNT}
        muiTableBodyCellProps={{
            style: { "transition": "none" }
        }}
        muiTableHeadCellProps={{
            style: { "transition": "none" }
        }}
        muiTableFooterCellProps={{
            style: { "transition": "none" }
        }}
    />
}


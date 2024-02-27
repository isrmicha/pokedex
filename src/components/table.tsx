'use client'

import React from "react";
import { getPokemonImage } from "~/utils/image";
import { startCase } from "lodash";
import Image from "next/image";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMaterialReactTable, MaterialReactTable } from "material-react-table";
import { TOTAL_POKEMON_COUNT } from "~/constants";
import { useQueryParams } from "~/hooks/useQueryParams";
import { updateUserFavorite } from "~/app/actions";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

const Table = ({ pageSize, pageIndex }: {
  pageSize: number,
  pageIndex: number,
}) => {

  const { data: pokemons, isLoading } = api.pokemonRouter.getPokemons.useQuery({ limit: Number(pageSize), offset: Number(pageIndex * pageSize) })
  const { data: session, update,  } = useSession()
  const favorites = session?.user.favorites
  const pokemonsWithIsFavorite = pokemons?.items.map((item) => {
    item.isFavorite = favorites?.includes(`${item.id}`);
    return item;
  });
  const { setParams } = useQueryParams()

  const handleClickFavorite = async (id: string) => {
    updateUserFavorite(id).then(() => {
       update()
    })
  }

  const columns = [
    {
      accessorKey: "id", //access nested data with dot notation
      header: "ID",
      key: "id",
      Cell: ({ cell }) => {
        return <Chip label={`#${cell.getValue?.()}`} />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      key: "name",
      Cell: ({ cell }) => {
        return <Chip label={startCase(cell.getValue?.())} />;
      },
    },
    {
      header: "Image",
      accessorKey: "id_image",
      key: "image",

      Cell: ({ cell }) => {
        const imageSrc = getPokemonImage(cell.row.original.id);
        return (
          <div style={{ position: "relative", height: 50, width: 50 }}>
            <Image
              alt={imageSrc}
              src={imageSrc}
              fill
              sizes="199vw"
              style={{ objectFit: "contain" }}

            />
          </div>
        );
      },
    },
    {
      header: "Favorite",
      accessorKey: "id_favorite",
      key: "favorite",
      Cell: ({ cell }) => {
        return <IconButton
          disabled={!session}
          aria-label="favorites"
          onClick={() => handleClickFavorite(`${cell.row.original.id}`)}
        >
          <FavoriteIcon
            style={{
              color: cell.row.original.isFavorite ? "red" : "unset",
            }}
          />
        </IconButton>
      }
    }
  ]

  const setPagination = pagination => {
    setParams(pagination({ pageIndex, pageSize }))
  }

  const tableProps = useMaterialReactTable({
    columns,
    data: pokemonsWithIsFavorite || [],
    onPaginationChange: setPagination,
    rowCount: TOTAL_POKEMON_COUNT,
    enablePagination: true,
    manualPagination: true,
    paginationDisplayMode: 'pages',
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30, 40, 50],
      shape: 'rounded',
      variant: 'outlined',
    },
    state: {
      isLoading,
      pagination: {
        pageIndex,
        pageSize
      }
    },
     muiSkeletonProps: {
      height: 50
     },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        {row.original.stats.map((stat) => (
          <Box key={stat.statName.name}>
            <Typography >
              <Chip size="small" label={`${startCase(stat.statName.name)}: ${stat.base_stat}`} />

            </Typography>
          </Box>
        ))}
      </Box>
    ),
  });
  return <MaterialReactTable table={tableProps} />;
};

export default Table
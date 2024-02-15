'use client'

import React from "react";
import { getPokemonImage } from "~/utils/image";
import { startCase } from "lodash";
import Image from "next/image";
import { Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMaterialReactTable, MaterialReactTable } from "material-react-table";
import { TOTAL_POKEMON_COUNT } from "~/constants";
import { useQueryParams } from "~/hooks/useQueryParams";
import { updateUserFavorite } from "~/app/actions";



export const Table = ({ pokemons, session }) => {
  const { getParam, setParams } = useQueryParams()
  const pageIndex = Number(getParam("pageIndex") ?? "0")
  const pageSize = Number(getParam("pageSize") ?? "10")

  const handleClickFavorite = async (id: string) => {
    await updateUserFavorite(id)
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
              sizes="100vw"
              style={{ objectFit: "cover" }}
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
    data: pokemons || [],
    onPaginationChange: setPagination,
    rowCount: TOTAL_POKEMON_COUNT,
    enablePagination: true,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize
      }
    }
  });
  return <MaterialReactTable table={tableProps} />;
};


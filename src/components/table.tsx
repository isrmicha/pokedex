'use client'
import React, { useState } from "react";
import { getPokemonImage } from "~/utils/image";
import { startCase } from "lodash";
import Image from "next/image";
import { Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMaterialReactTable, MaterialReactTable } from "material-react-table";
import { TOTAL_POKEMON_COUNT } from "~/constants";
import { useRouter } from "next/navigation";


export const Table = ({ pokemons, limit, offset }) => {

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
          // disabled={!isLogged}
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


  // const [pagination, setPagination] = useState<MRT_PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 5, //customize the default page size
  // });
  const router = useRouter()
  const setPagination = pagination => {
    router.push({ query: pagination(old => old) })
  }
  // console.log(pagination)

  const tableProps = useMaterialReactTable({
    columns,
    data: pokemons?.items || [],
    onPaginationChange: setPagination,
    rowCount: TOTAL_POKEMON_COUNT,
    enablePagination: true,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: offset,
        pageSize: limit
      }
    }
  });
  return <MaterialReactTable table={tableProps} />;
};


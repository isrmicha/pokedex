'use client';
import React from "react";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

export const TableComponent = ({ pokemons }) => {
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
    const tableProps = useMaterialReactTable({
        columns,
        data: pokemons?.items || [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });
    return <MaterialReactTable table={tableProps} />;

};

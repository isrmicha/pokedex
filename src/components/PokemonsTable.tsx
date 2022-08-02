import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  CircularProgress,
  tableCellClasses,
} from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { POKEMON_CRY_URL } from "../constants/pokemon";
import { LIMIT_PER_PAGE, POKEMONS_QUERY_KEY } from "../constants/query";
import { getPokemonsQuery } from "../querys/pokedex";
import { Pokemon } from "../types/pokemon";
import { getPokemonImage } from "../utils/image";
import { toNormalCase } from "../utils/string";
import styled from "styled-components";

export const PokemonsTable = ({
  setSelectedPokemonId,
}: {
  setSelectedPokemonId: Dispatch<SetStateAction<null | number>>;
}) => {
  const [offset, setOffset] = useState(0);
  const {
    isLoading,
    error,
    data,
    isFetchingPreviousPage,
    fetchNextPage,
    hasPreviousPage,
  } = useInfiniteQuery([POKEMONS_QUERY_KEY], getPokemonsQuery, {
    getNextPageParam: () => offset ?? undefined,
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      setOffset(offset + LIMIT_PER_PAGE);
      fetchNextPage();
    }
  }, [inView]);
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Sprite</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {error ? (
            <div>Aconteceu algo errado...</div>
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {data?.pages.map((page) =>
                page.map(({ id, name, sprites }: Pokemon, index: number) => (
                  <>
                    <StyledTableRow
                      key={id}
                      onClick={() => setSelectedPokemonId(id)}
                    >
                      <StyledTableCell component="th" scope="row">
                        #{id}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {toNormalCase(name)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <img width={50} src={getPokemonImage(sprites)} />
                      </StyledTableCell>
                    </StyledTableRow>
                    {index === LIMIT_PER_PAGE - 1 && <div ref={ref} />}
                  </>
                ))
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(0, 0, 0)",
    color: "rgb(255, 255, 255)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

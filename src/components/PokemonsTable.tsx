import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Chip,
  Stack,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LIMIT_PER_PAGE, POKEMONS_QUERY_KEY } from "../constants/query";
import { getPokemonsQuery } from "../querys/pokedex";
import { Pokemon } from "../types/pokemon";
import { getPokemonImage } from "../utils/image";
import { Loading } from "./Loading";
import { StyledTableRow, StyledTableCell } from "./Table.style";

export const PokemonsTable = ({
  setSelectedPokemonId,
}: {
  setSelectedPokemonId: Dispatch<SetStateAction<null | number>>;
}) => {
  const [offset, setOffset] = useState(20);
  const { isLoading, error, data, fetchNextPage } = useInfiniteQuery(
    [POKEMONS_QUERY_KEY],
    getPokemonsQuery,
    {
      getNextPageParam: () => offset,
    }
  );
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      setOffset(offset + LIMIT_PER_PAGE);
      fetchNextPage();
    }
  }, [inView, offset, fetchNextPage]);
  return error ? (
    <div>Aconteceu algo errado...</div>
  ) : isLoading ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Sprite</StyledTableCell>
            <StyledTableCell>Types</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <>
            {data?.pages.map((page, indexPages) =>
              page.map(
                ({ id, name, sprites, types }: Pokemon, index: number) => (
                  <>
                    <StyledTableRow
                      key={id}
                      onClick={() => setSelectedPokemonId(id)}
                    >
                      <StyledTableCell component="th" scope="row">
                        #{id}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {name}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Image
                          src={getPokemonImage(sprites)}
                          alt="pokemon"
                          width={50}
                          height={50}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" spacing={1}>
                          {types.map(({ type: { name } }) => (
                            <Chip key={name} label={name} color="default" />
                          ))}
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                    {index === page.length - 1 &&
                      indexPages === data.pages.length - 1 && (
                        <div ref={ref}>Loading...</div>
                      )}
                  </>
                )
              )
            )}
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

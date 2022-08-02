import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  CircularProgress,
} from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { POKEMON_CRY_URL } from "../constants/pokemon";
import { LIMIT_PER_PAGE, POKEMONS_QUERY_KEY } from "../constants/query";
import { getPokemonsQuery } from "../querys/pokedex";
let audio = null;
export const PokemonsTable = ({
  setSelectedPokemonId,
}: {
  setSelectedPokemonId: (arg0: number) => void;
}) => {
  const [offset, setOffset] = useState(0);
  const {
    isLoading,
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
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Sprite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {data.pages.map((page) =>
                page.map(({ id, name, sprites }, index) => (
                  <>
                    <TableRow key={id} onClick={() => setSelectedPokemonId(id)}>
                      <TableCell component="th" scope="row">
                        #{id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell>
                        <img
                          src={JSON.parse(sprites?.[0]?.sprites)?.front_default}
                        />
                      </TableCell>
                    </TableRow>
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

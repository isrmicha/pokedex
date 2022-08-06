import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { Pokemon } from "../types/pokemon";
import { getPokemonImage } from "../utils/image";
import { toNormalCase } from "../utils/string";
import { StyledTableRow, StyledTableCell } from "./Table.style";

export const ModalPokemonTable = () => {
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
          <>
            {/* <StyledTableRow key={id}>
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
               */}
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

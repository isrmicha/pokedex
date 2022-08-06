import { TableCell, tableCellClasses, TableRow } from "@mui/material";
import { styled } from "@stitches/react";

export const StyledTableCell = styled(TableCell, {
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(0, 0, 0)",
    color: "rgb(255, 255, 255)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  textTransform: "capitalize",
});

export const StyledTableRow = styled(TableRow, {
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  cursor: "pointer",
});

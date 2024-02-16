import { Analytics } from "@vercel/analytics/react";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { TableWrapper } from "~/components/table-wrapper";
import { HeaderItems } from "~/components/HeaderItems";
import Loading from "./loading";

export default async function Home(props: { searchParams: { pageSize: number, pageIndex: number } }) {
  const { searchParams: { pageSize = 10, pageIndex = 0 } } = props

  return (
    <main>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="https://pokedex-isrmicha.vercel.app"
                sx={{
                  mr: 2,
                  display: { xs: "flex" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                POKEDEX
              </Typography>
                <Suspense fallback={<Loading />}>
                  <HeaderItems />
                </Suspense>
            </Toolbar>
          </AppBar>
        </Box>

        <div className="site-layout-content">
          <Grid container>
            <Grid item xs={12}>
              <Suspense fallback={<Loading full/>}>
                <TableWrapper pageSize={pageSize} pageIndex={pageIndex} />
              </Suspense>
            </Grid>
          </Grid>
        </div>

        <Analytics mode="auto"/>
      </>
    </main>
  );
}




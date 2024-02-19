import { Analytics } from "@vercel/analytics/react";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { HeaderItems } from "~/components/HeaderItems";
import { createContext } from "~/trpc/server";
import { appRouter } from "~/server/api/root";
import { Table } from "~/components/table";
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { Hydrate,dehydrate  } from '@tanstack/react-query';

export default async function Home(props: { searchParams: { pageSize: number, pageIndex: number } }) {
  const { searchParams } = props
  const pageSize = Number(searchParams.pageSize) || 10
  const pageIndex = Number(searchParams.pageIndex) || 0
  const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: await createContext(),
  transformer: superjson, // optional - adds superjson serialization
});

  await helpers.pokemonRouter.getPokemons.prefetch({ limit: 10, offset: 0 })
  const dehydratedState = dehydrate(helpers.queryClient);
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
                  <HeaderItems />
            </Toolbar>
          </AppBar>
        </Box>

        <div className="site-layout-content">
          <Grid container>
            <Grid item xs={12}>
                <Hydrate state={dehydratedState}>
                  <Table pageSize={pageSize} pageIndex={pageIndex} />
                </Hydrate>
            </Grid>
          </Grid>
        </div>

        <Analytics mode="auto"/>
      </>
    </main>
  );
}




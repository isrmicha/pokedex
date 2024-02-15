import { getServerAuthSession } from "~/server/auth";
import { Analytics } from "@vercel/analytics/react";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Skeleton,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import FavoriteDrawer from "~/components/favorite-drawer";
import { Suspense } from "react";
import { Favorite } from "../components/Favorite";
import { TableWrapper } from "~/components/table-wrapper";
import { UserHeader } from "~/components/UserHeader";


export default async function Home({
  params,
  searchParams: { isFavoriteOpen: isFavoriteOpenRaw, pageSize = 10, pageIndex = 0 } }) {

  const session = await getServerAuthSession();
  const isFavoriteOpen = isFavoriteOpenRaw === 'true'


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
              {session && (
                <>

                  <Avatar
                    src={`${session.user.image}`}
                    sx={{ marginLeft: 2 }}
                    alt={`${session.user.image}`}
                  />
                  <Chip
                    style={{ color: "white" }}
                    label={session.user?.name}
                    sx={{
                      marginLeft: 2,
                      display: { xs: "none", md: "flex" },
                    }}
                  />
                  <Favorite isFavoriteOpen={isFavoriteOpen} favoritesCount={session?.user?.favorites?.length}></Favorite>
                </>
              )}
              <UserHeader session={session} />

            </Toolbar>
          </AppBar>
        </Box>

        <div className="site-layout-content">
          <Grid container>
            <Grid item xs={12}>

              <Suspense fallback={<Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', padding: 50 }}>
                <CircularProgress />
              </Box>}>
                <TableWrapper pageSize={pageSize} pageIndex={pageIndex} session={session} />
              </Suspense>
            </Grid>
          </Grid>
        </div>
        {isFavoriteOpen && (
          <FavoriteDrawer session={session} />
        )}
        <Analytics />
      </>
    </main>
  );
}




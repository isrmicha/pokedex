import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";


import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Table } from "~/components/table";
import { Loading } from "~/components/loading";
import { Analytics } from "@vercel/analytics/react";
import { trpc } from "~/utils/trpc";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";
import FavoriteDrawer from "~/components/favorite-drawer";
import { UserHeader } from "~/components/userHeader";
import { Suspense } from "react";
import { Favorite } from "../components/Favorite";


export default async function Home({
  params,
  searchParams: { isFavoriteOpen: isFavoriteOpenRaw, offset = 0, limit = 10 } }) {
  noStore();

  const session = await getServerAuthSession();
  const isFavoriteOpen = isFavoriteOpenRaw === 'true'
  const pokemons = await api.pokemonRouter.getPokemons.query({ limit, offset })
  return (
    <main className="">
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
                  <IconButton
                    // onClick={toggleTheme}
                    sx={{ marginLeft: 2 }}
                    aria-label="theme"
                  >
                    {/* {theme.value === "dark" ? (
                      <Brightness4Icon />
                    ) : (
                      <NightsStayIcon sx={{ color: "white" }} />
                    )} */}
                  </IconButton>
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
                  <Favorite isFavoriteOpen={isFavoriteOpen} favorites={session?.user?.favorites}></Favorite>
                </>
              )}
              <UserHeader session={session} />

            </Toolbar>
          </AppBar>
        </Box>

        <div className="site-layout-content">
          <Grid container>
            <Grid item xs={12}>
              <Suspense fallback={<div>Loading...</div>}>
                <Table pokemons={pokemons} />
              </Suspense>
            </Grid>
          </Grid>
        </div>
        {/* {false && (
          <FavoriteDrawer
            favorites={favorites}
            updateUser={updateUser}
            isLogged={isLogged}
            handleClickFavorite={handleClickFavorite}
            onClose={() => setIsOpenFavoriteDrawer(false)}
          />
        )} */}
        <Analytics />
      </>
    </main>
  );
}




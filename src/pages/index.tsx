import { GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Table } from "~/components/table";
import { Loading } from "~/components/loading";
import { Analytics } from "@vercel/analytics/react";
import { trpc } from "~/utils/trpc";
import { ssgInit } from "~/server/ssg-init";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { theme, toggleTheme } from "~/signals";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";
import dynamic from "next/dynamic";

const FavoriteDrawer = dynamic(() => import("~/components/favorite-drawer"));

const Home: NextPage = () => {
  const { data: sessionData, status, update } = useSession();
  const [isOpenFavoriteDrawer, setIsOpenFavoriteDrawer] = useState(false);
  const updateUser = trpc.user.updateOne.useMutation();
  const favorites = sessionData?.user?.favorites;

  const handleClickFavorite = async (id: string) => {
    const newFavorites = !!favorites
      ? favorites?.includes(id)
        ? favorites?.filter((pokemonId) => pokemonId !== id)
        : [...favorites, id]
      : [id];
    await updateUser.mutateAsync({
      data: { favorites: newFavorites },
      where: { id: sessionData?.user?.id },
    });
    update();
  };
  const isLogged = status === "authenticated";
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Develop by isrmicha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            {sessionData && (
              <>
                <IconButton
                  onClick={toggleTheme}
                  sx={{ marginLeft: 2 }}
                  aria-label="theme"
                >
                  {theme.value === "dark" ? (
                    <Brightness4Icon />
                  ) : (
                    <NightsStayIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
                <Avatar
                  src={`${sessionData.user.image}`}
                  sx={{ marginLeft: 2 }}
                  alt={`${sessionData.user.image}`}
                />
                <Chip
                  style={{ color: "white" }}
                  label={sessionData.user?.name}
                  sx={{
                    marginLeft: 2,
                    display: { xs: "none", md: "flex" },
                  }}
                />
                <Badge
                  badgeContent={favorites?.length}
                  color="primary"
                  sx={{ marginLeft: 2 }}
                  aria-label="favorites"
                >
                  <IconButton
                    aria-label="favorites"
                    onClick={() => setIsOpenFavoriteDrawer(true)}
                  >
                    <FavoriteIcon
                      style={{ color: "red" }}
                      aria-label="favorites"
                    />
                  </IconButton>
                </Badge>
              </>
            )}
            {status === "loading" && !sessionData ? (
              <Loading />
            ) : (
              <>
                <Button
                  variant="contained"
                  aria-label={isLogged && sessionData ? "Logout" : "Login"}
                  sx={{ marginLeft: 2, display: { xs: "none", md: "flex" } }}
                  onClick={() => (isLogged ? signOut() : signIn("google"))}
                >
                  {isLogged && sessionData ? "Logout" : "Login"}
                </Button>
                <IconButton
                  aria-label="favorites"
                  onClick={() => (isLogged ? signOut() : signIn("google"))}
                  sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
                >
                  {isLogged && sessionData ? <LogoutIcon /> : <GoogleIcon />}
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <div className="site-layout-content">
        <Grid container>
          <Grid item xs={12}>
            <Table
              isLoadingFavoritedIds={status === "loading"}
              favorites={favorites}
              isLogged={isLogged}
              updateUser={updateUser}
              handleClickFavorite={handleClickFavorite}
            />
          </Grid>
        </Grid>
      </div>
      {isOpenFavoriteDrawer && (
        <FavoriteDrawer
          favorites={favorites}
          updateUser={updateUser}
          isLogged={isLogged}
          handleClickFavorite={handleClickFavorite}
          onClose={() => setIsOpenFavoriteDrawer(false)}
        />
      )}
      <Analytics />
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const [helpers] = await Promise.all([ssgInit(context)]);
  await Promise.all([
    helpers.pokemon.getPokemons.prefetch({ offset: 0, limit: 10 }),
  ]);
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}

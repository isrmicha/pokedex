import { GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Table } from "~/components/table";
import { Loading } from "~/components/loading";
import { FavoriteDrawer } from "~/components/favorite-drawer";
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
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { theme, toggleTheme } from "~/signals";

const Home: NextPage = () => {
  const { data: sessionData, status, update } = useSession();
  const [isOpenFavoriteDrawer, setIsOpenFavoriteDrawer] = useState(false);
  const updateUser = trpc.user.updateOne.useMutation();
  const favorites = sessionData?.user?.favorites;
  const isMobile = useMediaQuery("(max-width:480px)");

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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokedex
            </Typography>

            {sessionData && (
              <>
                <IconButton onClick={toggleTheme} sx={{ marginLeft: 2 }}>
                  {theme.value === "dark" ? (
                    <Brightness4Icon />
                  ) : (
                    <NightsStayIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
                <Avatar src={sessionData.user.image} sx={{ marginLeft: 2 }} />
                {!isMobile && (
                  <Chip
                    style={{ color: "white" }}
                    label={sessionData.user?.name}
                    sx={{ marginLeft: 2 }}
                  />
                )}
                <Badge
                  badgeContent={favorites?.length}
                  color="primary"
                  sx={{ marginLeft: 2 }}
                >
                  <IconButton
                    aria-label="favorites"
                    onClick={() => setIsOpenFavoriteDrawer(true)}
                  >
                    <FavoriteIcon style={{ color: "red" }} />
                  </IconButton>
                </Badge>
              </>
            )}
            {status === "loading" ? (
              <Loading />
            ) : (
              <Button
                variant="contained"
                sx={{ marginLeft: 2 }}
                onClick={() => (isLogged ? signOut() : signIn("google"))}
              >
                {isLogged ? "Logout" : "Login"}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <div className="site-layout-content">
        <Table
          isLoadingFavoritedIds={status === "loading"}
          favorites={favorites}
          isLogged={isLogged}
          updateUser={updateUser}
          handleClickFavorite={handleClickFavorite}
        />
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

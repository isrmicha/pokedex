import { GetServerSidePropsContext, type NextPage, } from "next"
import Head from "next/head"
import { signIn, signOut, useSession, } from "next-auth/react"
import { Table, } from "~/components/table"
import { Loading, } from "~/components/loading"
import { FavoriteDrawer, } from "~/components/favorite-drawer"
import { Analytics, } from '@vercel/analytics/react'
import { trpc, } from "~/utils/trpc"
import { ssgInit, } from "~/server/ssg-init"
import { AppBar, Avatar, Badge, Box, Button, Chip, IconButton, Toolbar } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { useState } from "react"

const Home: NextPage = () => {
  const { data: sessionData, status, update } = useSession()
  const [isOpenFavoriteDrawer, setIsOpenFavoriteDrawer,] = useState(false)
  const updateUser = trpc.user.updateOne.useMutation()
  const favorites = sessionData?.user?.favorites
  const handleClickFavorite = async (id: string) => {
    const newFavorites = !!favorites ? favorites?.includes(id) ? favorites?.filter(pokemonId => pokemonId !== id) : [...favorites, id,] : [id,]
    await updateUser.mutateAsync(
      {
        data: { favorites: newFavorites },
        where: { id: sessionData?.user?.id }
      }
    )
    update()
  }
  const isLogged = status === 'authenticated'
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
                <Avatar src={sessionData.user.image} alt="Rounded avatar" />
                <Chip style={{ color: "white" }} label={sessionData.user?.name} />
                <Badge badgeContent={favorites?.length} color="primary">
                  <IconButton aria-label="favorites" onClick={() => setIsOpenFavoriteDrawer(true)}>
                    <FavoriteIcon style={{ color: "red" }} />
                  </IconButton>
                </Badge>
              </>

            )}
            {status === 'loading' ? <Loading /> : (
              <Button variant="contained"
                onClick={() => isLogged ? signOut() : signIn('google')}
              >{isLogged ? 'Logout' : 'Login'}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <div className="site-layout-content">
        <Table
          isLoadingFavoritedIds={status === 'loading'}
          favorites={favorites}
          isLogged={isLogged}
          updateUser={updateUser}
          handleClickFavorite={handleClickFavorite}
        />
      </div>

      {isOpenFavoriteDrawer && <FavoriteDrawer
        favorites={favorites}
        updateUser={updateUser}
        isLogged={isLogged}
        handleClickFavorite={handleClickFavorite}
        onClose={() => setIsOpenFavoriteDrawer(false)}
      />}
      <Analytics />
    </>
  )
}

export default Home

export async function getServerSideProps(
  context: GetServerSidePropsContext,
) {
  const [helpers] = await Promise.all([
    ssgInit(context),
  ])
  await Promise.all([
    helpers.pokemon.getPokemons.prefetch({ offset: 0, limit: 10 }),
  ])
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}

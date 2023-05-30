import { GetServerSidePropsContext, type NextPage, } from "next"
import Head from "next/head"
import { signIn, signOut, useSession, } from "next-auth/react"
import { Table, } from "~/components/table"
import { Loading, } from "~/components/loading"
import { useEffect, useState, } from "react"
import { useMedia, } from "react-use"
import { FavoriteDrawer, } from "~/components/favorite-drawer"
import { Analytics, } from '@vercel/analytics/react'
import { trpc, } from "~/utils/trpc"
import { ssgInit, } from "~/server/ssg-init"
import { AppBar, Avatar, Badge, Box, Button, Chip, IconButton, Toolbar } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from "@mui/material/Unstable_Grid2"

import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';


const Home: NextPage = () => {
  const { data: sessionData, status, } = useSession()
  useEffect(() => { if (status === 'unauthenticated') signIn('google') }, [status,])
  const isMobile = useMedia('(max-width: 480px)', false)
  const [isOpenFavoriteDrawer, setIsOpenFavoriteDrawer,] = useState(false)
  const { data: userData, isLoading: isLoadingFavoritedIds, } = trpc.user.findUnique
    .useQuery({
      where: {
        id: sessionData?.user?.id,
      },
      select: {
        favorites: true
      }
    }, { enabled: !!sessionData?.user.id, })
  const updateUser = trpc.user.updateOne.useMutation()
  const { invalidate, } = trpc.useContext()
  const favorites = userData?.favorites
  const handleClickFavorite = async (id: string) => {
    const newFavorites = !!favorites ? favorites?.includes(id) ? favorites?.filter(pokemonId => pokemonId !== id) : [...favorites, id,] : [id,]
    await updateUser.mutateAsync(
      {
        data: { favorites: newFavorites },
        where: { id: sessionData?.user?.id }
      }
    )
    await invalidate()
  }

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
                onClick={signOut}
              >Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>




      <div className="site-layout-content">
        <Table sessionData={sessionData}
          isLoadingFavoritedIds={isLoadingFavoritedIds}
          favorites={favorites}
          updateUser={updateUser}
          handleClickFavorite={handleClickFavorite}
        />
      </div>

      {isOpenFavoriteDrawer && <FavoriteDrawer
        favorites={favorites}
        updateUser={updateUser}
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

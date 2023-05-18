import { GetServerSidePropsContext, type NextPage, } from "next"
import Head from "next/head"
import { signIn, signOut, useSession, } from "next-auth/react"
import { Avatar, Badge, Button, Col, Row, Space, Tag, } from 'antd'
import { Table, } from "~/components/table"
import { Loading, } from "~/components/loading"
import { Breadcrumb, Layout, theme, } from 'antd'
import { useEffect, useState, } from "react"
import { useMedia, } from "react-use"
import { FavoriteDrawer, } from "~/components/favorite-drawer"
import {
  HeartFilled,
} from '@ant-design/icons'
import { Analytics, } from '@vercel/analytics/react'
import { trpc, } from "~/utils/trpc"
import { ssgInit, } from "~/server/ssg-init"



const { Header, Content, Footer, } = Layout

const Home: NextPage = () => {
  const {
    token: { colorBgContainer, },
  } = theme.useToken()
  const { data: sessionData, status, } = useSession()
  useEffect(() => { if (status === 'unauthenticated') signIn('google') }, [status,])
  const isMobile = useMedia('(max-width: 480px)', false)
  const [isOpenFavoriteDrawer, setIsOpenFavoriteDrawer,] = useState(false)
  const { data: favoriteData, isLoading: isLoadingFavoritedIds, } = trpc.favorite.findUnique
    .useQuery({
      where: {
        id: sessionData?.user?.id,
      },
      select: {
        pokemonIds: true,
      }
    }, { enabled: !!sessionData?.user.id, })
  const upsertOneFavorite = trpc.favorite.upsertOne.useMutation()
  const { invalidate, } = trpc.useContext()
  const handleClickFavorite = async (id: string) => {
    const pokemonIds = !!favoritedIds ? favoritedIds?.includes(id) ? favoritedIds?.filter(pokemonId => pokemonId !== id) : [...favoritedIds, id,] : [id,]
    await upsertOneFavorite.mutateAsync(
      {
        create: { id: sessionData?.user?.id, pokemonIds, },
        update: { pokemonIds },
        where: { id: sessionData?.user?.id }
      }
    )
    await invalidate()
  }

  const favoritedIds = favoriteData?.pokemonIds
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Develop by isrmicha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Header style={isMobile ? { paddingInline: 0, } : {}} >
          <div className="logo" />
          <Row justify={"end"}>
            <Col>
              <Space size={[12, 12,]} wrap>
                <>
                  {sessionData && (
                    <>
                      <Avatar src={sessionData.user.image} alt="Rounded avatar" />
                      <Tag color="processing" >{sessionData.user?.name}</Tag>
                      <Badge size="small" count={favoritedIds?.length} >
                        <Button type="undefined" size="small" shape="circle" icon={<HeartFilled style={{ color: "red", }} onClick={() => setIsOpenFavoriteDrawer(true)} />} />
                      </Badge>
                    </>
                  )}
                  <Button type="primary" onClick={signOut} style={{ marginLeft: 15, }}>
                    Logout
                  </Button>
                </>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: isMobile ? '0 5px' : '0 50px', }}>
          <Breadcrumb style={{ margin: '16px 0', }}
            items={[
              {
                title: 'Home',
              },
              {
                title: <a href="">List</a>,
              },
            ]}
          />
          <div className="site-layout-content" style={{ background: colorBgContainer, }}>
            <Table sessionData={sessionData}
              favoritedIds={favoritedIds}
              isLoadingFavoritedIds={isLoadingFavoritedIds}
              upsertOneFavorite={upsertOneFavorite}
              handleClickFavorite={handleClickFavorite}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', }}>©{new Date().getFullYear()} by  <a target="_blank" href="https://www.github.com/isrmicha">
          @isrmicha
        </a>
        </Footer>
      </Layout>
      {isLoadingFavoritedIds ? <Loading /> : (
        <>
          {isOpenFavoriteDrawer && <FavoriteDrawer
            upsertOneFavorite={upsertOneFavorite}
            handleClickFavorite={handleClickFavorite}
            onClose={() => setIsOpenFavoriteDrawer(false)}
            favoritedIds={favoritedIds}
          />}
        </>
      )
      }
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
    helpers.pokemon.getPokemons.prefetch({ offset: 0 }),
  ])
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}

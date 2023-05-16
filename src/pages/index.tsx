import {  type NextPage, } from "next"
import Head from "next/head"
import { signIn, signOut, useSession, } from "next-auth/react"
import { Avatar, Badge, Button, Col,  Row, Space, Tag, } from 'antd'
import { Table, } from "~/components/table"
import { Loading, } from "~/components/loading"
import { Breadcrumb, Layout, theme, } from 'antd'
import { useEffect, useState, } from "react"
import { useMedia, } from "react-use"
import { FavoriteDrawer, } from "~/components/favorite-drawer"
import {
  HeartFilled,
} from '@ant-design/icons'
import { api, } from "~/utils/api"
import { Analytics, } from '@vercel/analytics/react'
import { createServerSideHelpers, } from '@trpc/react-query/server'
import { appRouter, } from "~/server/api/root"
import SuperJSON from "superjson"


const { Header, Content, Footer, } = Layout
const Home: NextPage = () => {
  const {
    token: { colorBgContainer, },
  } = theme.useToken()
  const { data: sessionData, status, } = useSession()
  useEffect(() => { if (status === 'unauthenticated') signIn() }, [status,])
  const isMobile = useMedia('(max-width: 480px)', false) 
  const [isOpenFavoriteDrawer, setIsOpenFavoriteDrawer,] = useState(false)
  const {data: favoritedIds, isLoading: isLoadingFavoritedIds,} = api.router.getFavorites.useQuery({ id: sessionData?.user?.id, }, { enabled: !!sessionData?.user.id, })
  return (

    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Develop by isrmicha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Header style={isMobile ? {paddingInline: 0,} : {}} >
          <div className="logo" />
          <Row justify={"end"}>
            <Col>
              <Space size={[12, 12,]} wrap>
                {status === 'loading' ? (<Loading />) : (
                  <>
                    {sessionData && (
                      <>
                        <Avatar src={sessionData.user.image} alt="Rounded avatar" />
                        <Tag color="processing" >{sessionData.user?.name}</Tag>
                        <Badge size="small" count={favoritedIds?.ids?.length} >
                          <Button size="small" type="undefined" shape="circle" icon={<HeartFilled style={{ color: "red", }} onClick={() => setIsOpenFavoriteDrawer(true)} />} />
                        </Badge>
                      </>
                    )}
                    <Button type="primary" onClick={signOut} style={{marginLeft: 15,}}>
                      {"Sign out"}
                    </Button>
                  </>
                )}
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
              <Table  sessionData={sessionData} favoritedIds={favoritedIds} isLoadingFavoritedIds={isLoadingFavoritedIds} />
            </div>
          </Content>
        <Footer style={{ textAlign: 'center', }}>©{new Date().getFullYear()} by  <a target="_blank" href="https://www.github.com/isrmicha">
          @isrmicha
        </a>
        </Footer>
      </Layout>
      {isLoadingFavoritedIds ? <Loading /> :
       <FavoriteDrawer open={isOpenFavoriteDrawer} 
       onClose={() => setIsOpenFavoriteDrawer(false)} favoritedIds={favoritedIds} />}
      <Analytics />
    </>
  )
}

export default Home



export async function getStaticProps(
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON, // optional - adds superjson serialization
  })
  // prefetch `post.byId`
  await helpers.router.getPokemons.prefetch({offset: 0,})
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 1,
  }
}

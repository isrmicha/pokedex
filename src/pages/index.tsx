import { type NextPage, } from "next"
import Head from "next/head"
import { signIn, signOut, useSession, } from "next-auth/react"
import { Avatar, Badge, Button, Col, Drawer, Row, Space, Tag, } from 'antd'
import { Table, } from "~/components/table"
import { Loading, } from "~/components/loading"
import { Breadcrumb, Layout, Menu, theme, } from 'antd'
import { useEffect, useState, } from "react"
import { useMedia, } from "react-use"
import { FavoriteDrawer, } from "~/components/favorite-drawer"
import {
  HeartFilled,
} from '@ant-design/icons'
import { api, } from "~/utils/api"
const { Header, Content, Footer, } = Layout
const Home: NextPage = () => {
  const {
    token: { colorBgContainer, },
  } = theme.useToken()
  const { data: sessionData, status, } = useSession()
  useEffect(() => { if (status === 'unauthenticated') signIn() }, [status,])
  const isMobile = useMedia('(max-width: 480px)')
  const [isOpenFavoriteDrawer, setIsOpenFavoriteDrawer,] = useState(false)
  const favoritedIds = api.router.getFavorites.useQuery({ id: data?.user.id, }, { enabled: !!data?.user.id, })

  return (

    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Develop by isrmicha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Header>
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
                        <Badge count={favoritedIds?.data?.ids?.length}>
                          <Button type="undefined" shape="circle" icon={<HeartFilled style={{ color: "red", }} onClick={() => setIsOpenFavoriteDrawer(true)} />} />
                        </Badge>
                      </>
                    )}
                    <Button type="primary" onClick={sessionData ? signOut : signIn}>
                      {sessionData ? "Sign out" : "Sign in"}
                    </Button>
                  </>
                )}
              </Space>
            </Col>
          </Row>
        </Header>
        {sessionData && (
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
              <Table favoritedIds={favoritedIds} />
            </div>
          </Content>
        )}
        <Footer style={{ textAlign: 'center', }}>©{new Date().getFullYear()} by  <a target="_blank" href="https://www.github.com/isrmicha">
          @isrmicha
        </a>
        </Footer>
      </Layout>
      <FavoriteDrawer open={isOpenFavoriteDrawer} onClose={() => setIsOpenFavoriteDrawer(false)} favoritedIds={favoritedIds} />

    </>
  )
}

export default Home


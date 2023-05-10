import { type NextPage, } from "next"
import Head from "next/head"
import { signIn, signOut, useSession, } from "next-auth/react"
import { Avatar, Button, Col, Row, Space, Tag, } from 'antd'
import { Table, } from "~/components/table"
import { Loading, } from "~/components/loading"
import { Breadcrumb, Layout, Menu, theme, } from 'antd'

const { Header, Content, Footer, } = Layout
const Home: NextPage = () => {
  const {
    token: { colorBgContainer, },
  } = theme.useToken()
  const { data: sessionData, status, } = useSession()
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
        <Content style={{ padding: '0 50px', }}>
          <Breadcrumb style={{ margin: '16px 0', }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content" style={{ background: colorBgContainer, }}>
            {sessionData && (<Table />)}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', }}>©{new Date().getFullYear()} by  <a target="_blank" href="https://www.github.com/isrmicha">
          @isrmicha
        </a>
        </Footer>
      </Layout>
    </>
  )
}

export default Home


import { type NextPage, } from "next"
import Head from "next/head"
import { signIn, signOut, useSession, } from "next-auth/react"
import { Avatar, Button, Col, Row, Space, Spin, Tag, } from 'antd'
import { Table, } from "~/components/table"
import { Loading, } from "~/components/loading"

const Home: NextPage = () => {
  const { data: sessionData, status, } = useSession()
  console.log(status)
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Develop by isrmicha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">

          <div className="flex flex-col items-center gap-2">

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">

                <Row justify={"end"}>
                  <Col>
                    <Space size={[12, 12,]} wrap>
                      {status === 'loading' ? (<Loading />) : (
                        <>
                          {sessionData && (
                            <>
                              <Avatar src={sessionData.user.image} alt="Rounded avatar" />
                              <Tag>{sessionData.user?.name}</Tag>
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
              </p>
              {sessionData && (<Table />)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home


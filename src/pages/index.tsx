import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, } from 'antd';
import { Table } from "~/components/table";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

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
                {sessionData && (
                  <>
                    <img src={sessionData.user.image} alt="Rounded avatar" />
                    <span>Olá  {sessionData.user?.name}</span>
                  </>
                )
                }

              </p>
              <Button type="primary" onClick={sessionData ? () => void signOut() : () => void signIn()}>
                {sessionData ? "Sign out" : "Sign in"}
              </Button>
              {sessionData && (<Table />)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;


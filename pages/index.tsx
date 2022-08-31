import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import Head from "next/head";

const Home = dynamic(() => import("../src/components/Home"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  return (
    <Container maxWidth="md" disableGutters>
      <Head>
        <title>Pokedex</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Home />
      </Box>
    </Container>
  );
};

export default HomePage;

import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMediaQuery } from "@mui/material";
import { IS_MOBILE_MEDIA_QUERY } from "../src/constants/media-query";

const Home = dynamic(() => import("../src/components/Home"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  const isMobile = useMediaQuery(IS_MOBILE_MEDIA_QUERY);
  return (
    <Container maxWidth={isMobile ? "sm" : "md"} disableGutters>
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

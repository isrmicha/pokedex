import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMediaQuery } from "@mui/material";
import { IS_MOBILE_MEDIA_QUERY } from "../src/constants/media-query";
import { ListPokemonsQuery } from "../src/querys/pokemon";
import { fetcher } from "../src/services/fetcher";

const Home = dynamic(() => import("../src/components/Home"), {
  ssr: false,
});

const HomePage: NextPage = ({ initialPokemons }) => {
  const isMobile = useMediaQuery(IS_MOBILE_MEDIA_QUERY);
  return (
    <Container maxWidth={isMobile ? "sm" : "md"} disableGutters>
      <Head>
        <title>Pokedex</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Home initialPokemons={initialPokemons} />
      </Box>
    </Container>
  );
};

export default HomePage;

export async function getStaticProps() {
  const data = await fetcher(ListPokemonsQuery, { limit: 20 })();
  return {
    props: { initialPokemons: data },
  };
}

import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("../src/components/Home"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <Home />
      </Box>
    </Container>
  );
};

export default HomePage;

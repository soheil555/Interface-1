import type { NextPageWithLayout } from "./_app";
import Header from "../components/home/Header";
import HeroBanner from "../components/home/HeroBanner";
import Protocol from "../components/home/Protocol";
import Footer from "../components/common/Footer";
import { Box, Container } from "@chakra-ui/react";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Container h="100vh" maxW="container.xl">
        <Header />
        <HeroBanner />
      </Container>

      <Box h="100vh" bg="gray.50" position="relative">
        <Container pt={10} maxW="container.xl" h="full">
          <Protocol />
        </Container>
      </Box>
      <Box bg="gray.50" px={10}>
        <Footer />
      </Box>
    </>
  );
};

export default Home;

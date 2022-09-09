import type { NextPageWithLayout } from "./_app";
import Header from "../components/home/Header";
import HeroBanner from "../components/home/HeroBanner";
import Protocol from "../components/home/Protocol";
import Footer from "../components/common/Footer";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Container minH="95vh" maxW="container.xl">
        <Header />
        <HeroBanner />
      </Container>

      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        position="relative"
        h={{ base: undefined, lg: "80vh" }}
      >
        <Container pt={10} maxW="container.xl" h="full">
          <Protocol />
        </Container>
      </Box>
      <Box bg={useColorModeValue("gray.50", "gray.900")} px={10} pt={10}>
        <Footer />
      </Box>
    </>
  );
};

export default Home;

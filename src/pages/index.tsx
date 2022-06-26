import type { NextPageWithLayout } from "./_app";
import HomeHeader from "../components/common/Header/HomeHeader";
import HeroBanner from "../components/home/HeroBanner";
import Counter from "../components/home/Counter";
import Protocol from "../components/home/Protocol";
import Footer from "../components/common/Footer";
import { Container } from "@chakra-ui/react";

const Home: NextPageWithLayout = () => {
  return (
    <Container maxW="container.xl">
      <HomeHeader />
      <HeroBanner />
      <Counter />
      <Protocol />
      <Footer />
    </Container>
  );
};

export default Home;

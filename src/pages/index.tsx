import type { NextPageWithLayout } from "./_app";
import Header from "../components/home/Header";
import HeroBanner from "../components/home/HeroBanner";
import Counter from "../components/home/Counter";
import Protocol from "../components/home/Protocol";
import Footer from "../components/common/Footer";
import { Container } from "@chakra-ui/react";

const Home: NextPageWithLayout = () => {
  return (
    <Container maxW="container.xl">
      <Header />
      <HeroBanner />
      <Counter />
      <Protocol />
      <Footer />
    </Container>
  );
};

export default Home;

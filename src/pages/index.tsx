import type { NextPage } from "next";
import { Container } from "@chakra-ui/react";

import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import HeroBanner from "../components/home/HeroBanner";
import Counter from "../components/home/Counter";
import Protocol from "../components/home/Protocol";

const Home: NextPage = () => {
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

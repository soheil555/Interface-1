import type { NextPage } from "next";

import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import HeroBanner from "../components/home/HeroBanner";
import Counter from "../components/home/Counter";
import Protocol from "../components/home/Protocol";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <HeroBanner />
      <Counter />
      <Protocol />
      <Footer />
    </>
  );
};

export default Home;

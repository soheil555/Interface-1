import Pool from "../../components/app/Pool";
import Layout from "../../components/app/Layout/Layout";
import type { NextPageWithLayout } from "../_app";

const Stake: NextPageWithLayout = () => {
  return (
    <Layout>
      <Pool />
    </Layout>
  );
};

export default Stake;

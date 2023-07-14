import Layout from "@/components/Layout";
import Main from "./Main";
import Hot from "./Hot";
import Dream from "./Dream";
import Collections from "./Collections";
import Auctions from "@/components/Auctions";
import Spotlight from "./Spotlight";
import Creativity from "./Creativity";
import Newsletter from "@/components/Newsletter";

import { auctions } from "@/mocks/auctions";

const HomePage = () => {
  return (
    <Layout layoutNoOverflow noRegistration>
      <Main />
      <Dream />
      <Collections />
      <Spotlight />
      <Hot />
      <Auctions items={auctions} />



      <Creativity />
      {/* <Newsletter /> */}
    </Layout>
  );
};

export default HomePage;

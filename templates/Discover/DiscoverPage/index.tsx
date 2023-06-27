import { useRef, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";
import Catalog from "@/components/Catalog";
import Auctions from "@/components/Auctions";
import Collections from "./Collections";
import Artists from "./Artists";
import Newsletter from "@/components/Newsletter";

import { auctions } from "@/mocks/auctions";
import { tabsTime, nfts, statuses } from "@/mocks/nfts";
//
import { getCommunities, getMissions } from "@/utils/axios";

const HomePage = () => {
  const [communities, setCommunities] = useState<any>([]);
  const [missions, setMissions] = useState<any>([]);
  const scrollToAll = useRef<any>(null);
  const scrollToCommunities = useRef<any>(null);
  const scrollToMissions = useRef<any>(null);
  const scrollToArtist = useRef<any>(null);

  useEffect(() => {
    getCommunities().then((res) => {
      setCommunities(res.data);
    });
    getMissions().then((res) => {
      setMissions(res.data);
      console.log(res.data);
    });
  }, []);

  const tabsSorting = [
    {
      title: "All",
      value: "all",
      anchor: scrollToAll,
    },
    {
      title: "Communities",
      value: "communities",
      counter: "456,789",
      anchor: scrollToCommunities,
    },
    {
      title: "Missions",
      value: "missions",
      counter: "123,987",
      anchor: scrollToMissions,
    },
    {
      title: "Creatives",
      value: "creatives",
      counter: "45,678",
      anchor: scrollToArtist,
    },
  ];
  return (
    <Layout layoutNoOverflow noRegistration>
      {communities ? (
        <>
          <Main scrollToRef={scrollToAll} />
          <Catalog
            title="Communities"
            tabsSorting={tabsSorting}
            tabsTime={tabsTime}
            filters={statuses}
            items={communities}
            scrollToRef={scrollToCommunities}
          />
          {/* <Auctions color="#DBFF73" items={auctions} /> */}
          <Collections scrollToRef={scrollToMissions} />
          <Artists scrollToRef={scrollToArtist} />
          <Newsletter />
        </>
      ) : (
        <div>data loading ...</div>
      )}
    </Layout>
  );
};

export default HomePage;

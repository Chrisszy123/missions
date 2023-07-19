import { useRef} from "react";
import Layout from "@/components/Layout";
import Catalog from "@/components/CommunityCatalog";
import { tabsTime, nfts, statuses } from "@/mocks/nfts";

interface Props{
  communities: any
}
const HomePage = ({communities}: Props) => {
  const scrollToAll = useRef<any>(null);
  const scrollToCommunities = useRef<any>(null);
  const scrollToMissions = useRef<any>(null);
  const scrollToArtist = useRef<any>(null);

  const tabsSorting = [
    {
      title: "All",
      value: "all",
      anchor: scrollToAll,
    },
    {
      title: "NFTS",
      value: "communities",
      counter: "456,789",
      anchor: scrollToCommunities,
    },
    {
      title: "DEFI",
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
      {communities?.length === 0 ? (
        <div>There are no communities at the moment</div>
      ) : (
        <>
          {/* <Main scrollToRef={scrollToAll} /> */}
          <Catalog
            title="Communities"
            tabsSorting={tabsSorting}
            tabsTime={tabsTime}
            filters={statuses}
            items={communities}
            scrollToRef={scrollToCommunities}
          />
          {/* <Newsletter /> */}
        </>
      )}
    </Layout>
  );
};

export default HomePage;

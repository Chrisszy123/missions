import type { NextPage, GetServerSidePropsContext } from "next";
import ErrorBoundary from "pages/_error";
// import { getAllCommunities } from "models/community";
import { getCommunities } from "@/utils/axios";
import { Community } from "@prisma/client";
import { useRef, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Catalog from "@/components/CommunityCatalog";
import { tabsTime, statuses } from "@/mocks/nfts";

interface Props {
  communities?: Community[];
}

const Discover: NextPage<Props> = () => {
  const scrollToAll = useRef<any>(null);
  const [communities, setCommunities] = useState<any>()
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
  useEffect(() => {
    getCommunities().then((c: any) => setCommunities(c?.data));
  }, [])
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};
export default Discover;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const communities: any = await getAllCommunities();
//   const serializedCommunities = communities.map((community: any) => ({
//     ...community,
//     createdAt: community?.createdAt.toISOString(),
//     updatedAt: community?.updatedAt.toISOString(),
//     owner: {
//       ...community.owner,
//       createdAt: community?.owner.createdAt.toISOString(),
//       updatedAt: community?.owner.updatedAt.toISOString(),
//     },
//     users: community?.users.map((user: any) => ({
//       ...user,
//       createdAt: user?.createdAt.toISOString(),
//       updatedAt: user?.updatedAt.toISOString(),
//     })),
//   }));
//   return {
//     props: {
//       communities: serializedCommunities,
//     },
//   };
// }

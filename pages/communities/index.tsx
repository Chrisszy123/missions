import type { NextPage, GetServerSidePropsContext } from "next";
import ErrorBoundary from "pages/_error";
// import { getAllCommunities } from "models/community";
import { getCommunities } from "@/utils/axios";
import { Community } from "@prisma/client";
import { useRef, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Catalog from "@/components/CommunityCatalog";
import { tabsTime, statuses } from "@/mocks/nfts";
import { useQuery } from "@tanstack/react-query";


interface Props {
  communities?: Community[];
}

const Discover: NextPage<Props> = () => {
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
  const {
    error,
    status,
    data: communities,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });
  return (
    <ErrorBoundary>
      <Layout layoutNoOverflow noRegistration>
            {communities?.data.length === 0 ? (
              <div>There are no communities at the moment</div>
            ) : (
              <>
                <Catalog
                  title="Communities"
                  tabsSorting={tabsSorting}
                  tabsTime={tabsTime}
                  filters={statuses}
                  items={communities?.data}
                  scrollToRef={scrollToCommunities}
                  status={status}
                />
              </>
            )}
      </Layout>
    </ErrorBoundary>
  );
};
export default Discover;

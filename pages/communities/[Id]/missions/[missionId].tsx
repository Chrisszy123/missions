import type { GetServerSidePropsContext, NextPage } from "next";
import NFTDetailPage from "@/templates/NFT/NFTDetailPage";
import ErrorBoundary from "pages/_error";
import { getOneMission } from "models/mission";
import { getSession } from "next-auth/react";
import { Mission } from "@prisma/client";
import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Details from "@/components/MissionDetails";

interface Props {
  mission: Mission[] | any;
}
const links = [
  {
    title: "View on Etherscane",
    icon: "country",
    url: "https://ui8.net/",
  },
  {
    title: "View metadata",
    icon: "link",
    url: "https://ui8.net/",
  },
  {
    title: "View on IPFS",
    icon: "link",
    url: "https://ui8.net/",
  },
];
const NFTDetail: NextPage<Props> = ({ mission }) => {
  const statistics = [
    {
      label: "Community",
      image: mission ? mission?.community?.image :"/images/robot.jpg",
      title: mission ? mission?.community?.name : "",
      category: mission ? mission?.community?.tags[0].name : "",
      link: mission ? `/communities/${mission?.community?.id}` : "#"
    },
  ];
  //
  return (
    <ErrorBoundary>
      <Layout layoutNoOverflow footerHide noRegistration>
        {mission ? (
          <>
            <Description
              image={mission?.image ? mission?.image : "/images/robot.jpg"}
              title={mission.name}
              date={`created at ${mission.createdAt.slice(0, 10)}`}
              statistics={statistics}
              links={links}
              tags={mission.category}
              // provenanceAction={{
              //   avatar: "/images/avatar.jpg",
              //   history: true,
              //   content: (
              //     <>
              //       Auction won by <span>0x56C1...8eCC</span>
              //     </>
              //   ),
              //   title: (
              //     <>
              //       Sold for <span>6.05 ETH</span> $9,256.58
              //     </>
              //   ),
              //   date: "Aug 18, 2022 at 18:80",

              //   linkTitle: (
              //     <>
              //       Auction settled by <span>@Kohaku</span>
              //     </>
              //   ),
              //   linkUrl: "#",
              // }}
              provenance={mission}
              content={mission.desc}
              missionData={mission}
            >
              <Details mission={mission} />
            </Description>
          </>
        ) : (
          <div>mission data loading...</div>
        )}
      </Layout>{" "}
    </ErrorBoundary>
  );
};
export default NFTDetail;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const missionId = context.query.missionId;
  const mission: any = await getOneMission(missionId);
  const serializedMission = {
    ...mission,
    createdAt: mission?.createdAt.toISOString(),
    updatedAt: mission?.updatedAt.toISOString(),
    users: mission?.users.map((user: any) => ({
      ...user,
      createdAt: user?.createdAt.toISOString(),
      updatedAt: user?.updatedAt.toISOString(),
    })),
    community: {
      ...mission?.community,
      createdAt: mission?.community.createdAt.toISOString(),
      updatedAt: mission?.community.updatedAt.toISOString(),
    },
  };
  return {
    props: {
      mission: serializedMission,
    },
  };
};

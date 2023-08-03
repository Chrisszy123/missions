import type { GetServerSidePropsContext, NextPage } from "next";
import NFTDetailPage from "@/templates/NFT/NFTDetailPage";
import ErrorBoundary from "pages/_error";
import { getOneMission } from "@/utils/axios";
import { getSession } from "next-auth/react";
import { Mission } from "@prisma/client";
import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Details from "@/components/MissionDetails";
import { useEffect, useState } from "react";
import Congrats from "@/components/Congrats";
import styles from "@/components/DetailsCollection/DetailsCollection.module.sass";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

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
const NFTDetail: NextPage<Props> = () => {
  const [deleted, setDeleted] = useState<any>();
  const [mission, setMission] = useState<Mission[] | any>();
  const router = useRouter();
  const missionId = router.query.missionId;
  useEffect(() => {
    getOneMission(missionId).then((m) => setMission(m?.message?.data));
  }, [missionId]);
  const statistics = [
    {
      label: "Community",
      image: mission ? mission?.community?.image : "/images/robot.jpg",
      title: mission ? mission?.community?.name : "",
      category: mission ? mission?.community?.tags[0].name : "",
      link: mission ? `/communities/${mission?.community?.id}` : "#",
    },
  ];
  //
  if (deleted) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <Congrats
          title="Success"
          content={
            <>
              You&apos;ve now deleted your mission! {mission?.name}
              <br></br>click below to go back to your dashboard
            </>
          }
          links={
            <>
              <Link href={`/dashboard`}>
                <a className={classNames("button-large", styles.button)}>
                  Dashboard
                </a>
              </Link>
            </>
          }
        />
      </Layout>
    );
  }
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
              setDeleted={setDeleted}
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
      </Layout>
    </ErrorBoundary>
  );
};
export default NFTDetail;

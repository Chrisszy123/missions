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
import { useQuery } from "@tanstack/react-query";
import MoonLoader from "react-spinners/MoonLoader";

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
  //const [mission, setMission] = useState<Mission[] | any>();
  const router = useRouter();
  const missionId = router.query.missionId;
  const {
    error,
    status,
    data: mission,
  } = useQuery({
    queryKey: ["missions", `${missionId!}`],
    queryFn: () => getOneMission(missionId!),
  });

  const statistics = [
    {
      label: "Community",
      image: mission
        ? mission?.message?.data?.community?.image
        : "/images/robot.jpg",
      title: mission ? mission?.message?.data?.community?.name : "",
      category: mission ? mission?.message?.data?.community?.tags[0].name : "",
      link: mission
        ? `/communities/${mission?.message?.data?.community?.id}`
        : "#",
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
              You&apos;ve now deleted your mission!{" "}
              {mission?.message?.data?.name}
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
        {status === "loading" ? (
          <div className="flex justify-center items-center p-8">
            <MoonLoader
              loading={true}
              color="#000"
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {mission ? (
              <>
                <Description
                  image={
                    mission?.message?.data?.image
                      ? mission?.message?.data?.image
                      : "/images/robot.jpg"
                  }
                  title={mission?.message?.data?.name}
                  date={`created at ${mission?.message?.data?.createdAt?.slice(
                    0,
                    10
                  )}`}
                  statistics={statistics}
                  links={links}
                  tags={mission?.message?.data?.category}
                  setDeleted={setDeleted}
                  provenance={mission?.message?.data}
                  content={mission?.message?.data?.desc}
                  missionData={mission?.message?.data}
                >
                  <Details mission={mission?.message?.data} />
                </Description>
              </>
            ) : (
              <div>No Missions now</div>
            )}
          </>
        )}
      </Layout>
    </ErrorBoundary>
  );
};
export default NFTDetail;

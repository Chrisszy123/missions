import type { GetServerSidePropsContext, NextPage } from "next";
import { getCommunity } from "@/utils/axios";
import ErrorBoundary from "pages/_error";
import { Community } from "@prisma/client";
import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Collection from "@/components/CommunityCollection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import Congrats from "@/components/Congrats";
import Link from "next/link";
import styles from "@/components/DetailsCollection/DetailsCollection.module.sass";
import cn from "classnames";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import MoonLoader from "react-spinners/MoonLoader";

interface Props {
  community?: Community[] | any;
}
const Profile: NextPage<Props> = () => {
  const { user }: any = useContext(AuthContext);
  const [deleted, setDeleted] = useState<any>();
  //const [community, setCommunity] = useState<Community[] | any>();
  const router = useRouter();
  const communityId = router.query.Id;
  const userId = user?.message?.data?.id;

  const {
    error,
    status,
    data: community,
  } = useQuery({
    queryKey: ["communities", `${communityId!}`],
    queryFn: () => getCommunity(communityId!),
  });
  const ownerId = community?.message?.data?.ownerId;
  if (deleted) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <Congrats
          title="Success"
          content={
            <>
              You&apos;ve now deleted your community!{" "}
              {community?.message?.data?.name}
              <br></br>click below to go back to your dashboard
            </>
          }
          links={
            <>
              <Link href={`/dashboard`}>
                <a className={cn("button-large", styles.button)}>
                  View Communities
                </a>
              </Link>
            </>
          }
        />
      </Layout>
    );
  }
  return (
    <>
      <ErrorBoundary>
        <Layout
          layoutNoOverflow
          footerHide
          noRegistration
          isCommunity={userId === ownerId ? true : false}
        >
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
              {community && community ? (
                <>
                  <Background />

                  <Collection
                    item={community?.message?.data}
                    setDeleted={setDeleted}
                  />
                </>
              ) : (
                <div>data loading...</div>
              )}
            </>
          )}
        </Layout>
      </ErrorBoundary>
    </>
  );
};

export default Profile;

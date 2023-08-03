import type { GetServerSidePropsContext, NextPage } from "next";
import { getOneCommunity } from "@/utils/axios";
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


interface Props {
  community?: Community[] | any;
}
const Profile: NextPage<Props> = () => {
  const {user}: any = useContext(AuthContext)
  const [deleted, setDeleted] = useState<any>();
  const [community, setCommunity] = useState<Community[] | any>();
  const router = useRouter()
  const communityId = router.query.Id
  const userId = user?.message?.data?.id
  const ownerId = community?.ownerId
  useEffect(() => {
    getOneCommunity(communityId).then((e) => setCommunity(e?.message?.data))
  }, [communityId])
  if (deleted) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <Congrats
          title="Success"
          content={
            <>
              You&apos;ve now deleted your community! {community?.name}<br></br>click below to go back to your dashboard
            </>
          }
          links={
            <>
              <Link
                href={`/dashboard`}
              >
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
          <Layout layoutNoOverflow footerHide noRegistration isCommunity={userId === ownerId ?  true : false}>
            {community && community ? (
              <>
                <Background />
                <Collection item={community} setDeleted={setDeleted}/> 
              </>
            ) : (
              <div>data loading...</div>
            )}
          </Layout>
        </ErrorBoundary>
    </>
  );
};

export default Profile;

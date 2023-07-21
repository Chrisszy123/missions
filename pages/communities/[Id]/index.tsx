import type { GetServerSidePropsContext, NextPage } from "next";
import { getOneCommunity } from "../../../models/community";
import ErrorBoundary from "pages/_error";
import { Community } from "@prisma/client";
import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Collection from "@/components/CommunityCollection";

interface Props {
  community?: Community[];
}
const Profile: NextPage<Props> = ({ community }) => {
  return (
    <>
      {community?.length === 0 ? (
        <div>Community data Loading...</div>
      ) : (
        <ErrorBoundary>
          <Layout layoutNoOverflow footerHide noRegistration isCommunity={true}>
            {community && community ? (
              <>
                <Background />
                <Collection item={community} /> 
              </>
            ) : (
              <div>data loading...</div>
            )}
          </Layout>
        </ErrorBoundary>
      )}
    </>
  );
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const communityId = context.query.Id;
  const community: any = await getOneCommunity(communityId);
  const serializedCommunity = {
    ...community,
    createdAt: community?.createdAt.toISOString(),
    updatedAt: community?.updatedAt.toISOString(),
    owner: {
      ...community?.owner,
      createdAt: community?.owner.createdAt.toISOString(),
      updatedAt: community?.owner.updatedAt.toISOString(),
    },
    users: community?.users.map((user: any) => ({
      ...user,
      createdAt: user?.createdAt.toISOString(),
      updatedAt: user?.updatedAt.toISOString(),
    })),
    missions: community?.missions.map((mission: any) => ({
      ...mission,
      createdAt: mission?.createdAt.toISOString(),
      updatedAt: mission?.updatedAt.toISOString(),
    })),
  };
  return {
    props: {
      community: serializedCommunity,
    },
  };
};

import type { NextPage, GetServerSidePropsContext } from "next";
import CommunitiesPage from "@/templates/Communities/DiscoverPage";
import ErrorBoundary from "pages/_error";
import { getSession } from "next-auth/react";
import { getAllCommunities } from "models/community";
import { Community } from "@prisma/client";

interface Props {
  communities?: Community[];
}

const Discover: NextPage<Props> = ({ communities }) => {
  return (
    <ErrorBoundary>
      <CommunitiesPage communities={communities}/>
    </ErrorBoundary>
  );
};
export default Discover;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const communities: any = await getAllCommunities();
    const serializedCommunities = communities.map((community: any) => ({
      ...community,
      createdAt: community?.createdAt.toISOString(),
      updatedAt: community?.updatedAt.toISOString(),
      owner: {
        ...community.owner,
        createdAt: community?.owner.createdAt.toISOString(),
        updatedAt: community?.owner.updatedAt.toISOString(),
      },
      users: community?.users.map((user: any) => ({
        ...user,
        createdAt: user?.createdAt.toISOString(),
        updatedAt: user?.updatedAt.toISOString(),
      })),
    }));
    return {
      props: {
        communities: serializedCommunities,
      },
    };
}

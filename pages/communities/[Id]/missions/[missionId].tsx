import type { GetServerSidePropsContext, NextPage } from "next";
import NFTDetailPage from "@/templates/NFT/NFTDetailPage";
import ErrorBoundary from "pages/_error";
import { getOneMission } from "models/mission";
import { getSession } from "next-auth/react";
import { Mission } from "@prisma/client";
interface Props {
  mission: Mission[]
}
const NFTDetail: NextPage<Props> = ({mission}) => {
  //
  return  <ErrorBoundary><NFTDetailPage mission={mission}/>  </ErrorBoundary>;
};
export default NFTDetail;

export const getServerSideProps = async(context: GetServerSidePropsContext) => {
  const missionId = context.query.missionId;
    const mission: any = await getOneMission(missionId)
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
      }
    }
    return {
      props: {
        mission: serializedMission
      }
    }
}
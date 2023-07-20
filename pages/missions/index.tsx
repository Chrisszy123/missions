import type { GetServerSidePropsContext, NextPage } from "next";
import MissionsPage from "@/templates/Mission/MissionPage";
import ErrorBoundary from "pages/_error";
import { getAllMissions } from "models/mission";
import { getSession } from "next-auth/react";
import { Mission } from "@prisma/client";

interface Props{
  missions?: Mission[]
}
const Discover: NextPage<Props> = ({missions}) => {
  return (
    <ErrorBoundary>
      <MissionsPage missions={missions}/>
    </ErrorBoundary>
  );
};
export default Discover;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (session) {
    const missions: any = await getAllMissions()
    const serializedMissions = missions.map((mission: any) => ({
      ...mission,
      createdAt: mission?.createdAt.toISOString(),
      updatedAt: mission?.updatedAt.toISOString(),
      community: {
        ...mission?.community,
        createdAt: mission?.community.createdAt.toISOString(),
        updatedAt: mission?.community.updatedAt.toISOString(),
      },
      users: mission?.users.map((user: any) => ({
        ...user,
        createdAt: user?.createdAt.toISOString(),
        updatedAt: user?.updatedAt.toISOString(),
      }))
    }))
    return{
      props: { 
        missions: serializedMissions
      }
    }
  }
};

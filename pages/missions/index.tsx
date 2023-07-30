import type { GetServerSidePropsContext, NextPage } from "next";
import ErrorBoundary from "pages/_error";
import { getAllMissions } from "models/mission";
import { Mission } from "@prisma/client";
import Layout from "@/components/Layout";
import Spotlight from "@/components/Spotlight";

interface Props{
  missions?: Mission[] | any
}
const Discover: NextPage<Props> = ({missions}) => {
  return (
    <ErrorBoundary>
      <Layout layoutNoOverflow noRegistration>
            <Spotlight missions={missions} title="Missions"  style="bg-black" titleStyle="text-[#fff]"/>
        </Layout>
    </ErrorBoundary>
  );
};
export default Discover;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
};

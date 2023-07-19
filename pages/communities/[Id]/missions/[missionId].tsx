import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import {useState, useEffect} from 'react'
import NFTDetailPage from "@/templates/NFT/NFTDetailPage";
import { getMissions } from "@/utils/axios";
import ErrorBoundary from "pages/_error";
import { getOneMission } from "models/mission";
import { getSession } from "next-auth/react";
import { Mission } from "@prisma/client";
interface Props {
  mission: Mission[]
}
const NFTDetail: NextPage<Props> = ({mission}) => {
  console.log(mission)
  //const [mission, setMission] = useState()
  // const router = useRouter()
  // const missionId = router.query.missionId
  // console.log(missionId)
  //
  // useEffect(() => {
  //    getMissions().then((e) => {
  //     const singleMission = e.data.filter((m: any) => m.id === missionId)
  //     setMission(singleMission)
  //    })
  // }, [missionId])
  //
  return  <ErrorBoundary><NFTDetailPage mission={mission}/>  </ErrorBoundary>;
};
export default NFTDetail;

export const getServerSideProps = async(context: GetServerSidePropsContext) => {
  const missionId = context.query.missionId;
  const session = await getSession(context);
  if(session){
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
}
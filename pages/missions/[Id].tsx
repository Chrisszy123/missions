import type { NextPage } from "next";
import { useRouter } from "next/router";
import {useState, useEffect} from 'react'
import NFTDetailPage from "@/templates/NFT/NFTDetailPage";
import { getMissions } from "@/utils/axios";

const NFTDetail: NextPage = () => {
  const [mission, setMission] = useState()
  const router = useRouter()
  const missionId = router.query.Id
  //
  useEffect(() => {
     getMissions().then((e) => {
      const singleMission = e.data.filter((m: any) => m.id === missionId)
      setMission(singleMission)
     })
  }, [])
  //
  return <NFTDetailPage mission={mission}/>;
};

export default NFTDetail;
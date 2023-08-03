import type {NextPage } from "next";
import ErrorBoundary from "pages/_error";
import { Mission } from "@prisma/client";
import Layout from "@/components/Layout";
import Spotlight from "@/components/Spotlight";
import { useEffect, useState } from "react";
import { getMissions } from "@/utils/axios";

const Discover: NextPage = () => {
  const [missions, setMissions] = useState<Mission[] | any>()
  useEffect(()=>{
    getMissions().then((m) => setMissions(m?.data))
  }, [])
  return (
    <ErrorBoundary>
      <Layout layoutNoOverflow noRegistration>
            <Spotlight missions={missions} title="Missions"  style="bg-black" titleStyle="text-[#fff]"/>
        </Layout>
    </ErrorBoundary>
  );
};
export default Discover;

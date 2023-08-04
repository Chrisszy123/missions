import type {NextPage } from "next";
import ErrorBoundary from "pages/_error";
import { Mission } from "@prisma/client";
import Layout from "@/components/Layout";
import Spotlight from "@/components/Spotlight";
import { getMissions } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const Discover: NextPage = () => {
  const {
    error,
    status,
    data: missions,
  } = useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  });
  
  return (
    <ErrorBoundary>
      <Layout layoutNoOverflow noRegistration>
            <Spotlight missions={missions?.data} title="Missions"  style="bg-black" titleStyle="text-[#fff]" status={status}/>
        </Layout>
    </ErrorBoundary>
  );
};
export default Discover;

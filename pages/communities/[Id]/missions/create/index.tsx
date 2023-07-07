import type { NextPage } from "next";
import CreatePage from "@/templates/MissionCreate/CreatePage";
import WithAuth from '@/components/WithAuth'

const Create: NextPage = () => {
    return <CreatePage />;
}

export default WithAuth(Create);

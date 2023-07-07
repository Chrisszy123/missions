import type { NextPage } from "next";
import CreatePage from "@/templates/Create/CreatePage";
import WithAuth from "@/components/WithAuth";

const Create: NextPage = () => {
    return <CreatePage />;
};

export default WithAuth(Create);

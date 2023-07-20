import type { NextPage } from "next";
import CreatePage from "@/templates/MissionCreate/CreatePage";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import AccessDenied from "@/components/AccessDenied/AccessDenied";

const Create: NextPage = () => {
    const { status } = useSession();
  if (status === 'unauthenticated') {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <AccessDenied message="You need to be signed in to create mission"/>
      </Layout>
    );
  }
    return <CreatePage />;
}

export default Create;

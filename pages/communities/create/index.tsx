import type { NextPage } from "next";
import CreatePage from "@/templates/Create/CreatePage";
import { useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied/AccessDenied";
import Layout from "@/components/Layout";

const Create: NextPage = () => {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <AccessDenied message="You need to be signed in to create community"/>
      </Layout>
    );
  }
  return <CreatePage />;
};

export default Create;

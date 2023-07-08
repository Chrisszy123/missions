import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CollectionPage from "@/templates/CollectionPage";
import { getOneCommunity } from "@/utils/axios";
import ErrorBoundary from "pages/_error";

const Profile: NextPage = () => {
  const [community, setCommunity] = useState<any>([]);
  
  const router = useRouter();
  const pageId = router.query.Id;
  useEffect(() => {
    if(pageId === undefined){
      setCommunity([])
    }else{
      getOneCommunity(pageId).then((c) => {
        setCommunity(c?.message.data);
      });
    }  
  }, [pageId]);
  return (
    <>
    {community?.length === 0 ? (
      <div>Community data Loading...</div>
    ): (
      <CollectionPage community={community} />
    )}
    </>
  );
};

const WithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <Profile />
  </ErrorBoundary>
);
export default WithErrorBoundary;

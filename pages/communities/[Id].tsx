import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CollectionPage from "@/templates/CollectionPage";
import { getOneCommunity } from "@/utils/axios";

const Profile: NextPage = () => {
  const [community, setCommunity] = useState<any>([]);
  
  const router = useRouter();
  const pageId = router.query.Id;
  useEffect(() => {
    getOneCommunity(pageId).then((c) => {
      setCommunity(c?.message?.data);
    });
    
  }, [pageId]);
  
  console.log(community)
  return <CollectionPage community={community} />;
};

export default Profile;

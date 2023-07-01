import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CollectionPage from "@/templates/CollectionPage";
import { getCommunities } from "@/utils/axios";

const Profile: NextPage = () => {
  const [community, setCommunity] = useState<any>([]);
  
  const router = useRouter();
  const pageId = router.query.Id;
  useEffect(() => {
    getCommunities().then((c) => {
      const data = c.data.filter((x: any) => x.id === pageId);
      setCommunity(data);
    });
    
  }, [pageId]);
  return <CollectionPage community={community} />;
};

export default Profile;

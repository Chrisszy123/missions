import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CollectionPage from "@/templates/CollectionPage";
import { getCommunities, getUsers } from "@/utils/axios";
import { AuthContext } from "context/AuthContext";
//import { AuthContext } from "context/AuthContext";

const Profile: NextPage = () => {
  //const {user}: any = useContext(AuthContext)
  const [community, setCommunity] = useState<any>([]);
  const router = useRouter();
  const pageId = router.query.Id;
  const {user, setUserId}: any = useContext(AuthContext)
  const useremail = user?.email
  useEffect(() => {
    getCommunities().then((c) => {
      const data = c.data.filter((x: any) => x.id === pageId);
      setCommunity(data);
    });
    getUsers().then((e) => { 
      const filteredUser = e.message.data.filter((user: any) => user.email  === useremail )
      console.log(filteredUser)
      setUserId(filteredUser[0].id)
    })
  }, []);
  return <CollectionPage community={community} />;
};

export default Profile;

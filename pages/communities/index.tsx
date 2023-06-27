import type { NextPage } from "next";
import CommunitiesPage from "@/templates/Communities/DiscoverPage";
import { getCommunities } from "@/utils/axios";

const Discover: NextPage = () => {
    return <CommunitiesPage/>;
};

export default Discover;

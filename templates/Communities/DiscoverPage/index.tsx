import { useRef, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";
import Catalog from "@/components/CommunityCatalog";
import Newsletter from "@/components/Newsletter";
import { tabsTime, statuses } from "@/mocks/nfts";
// 
import { getCommunities, getMissions } from "@/utils/axios";

const HomePage = () => {
    const [communities, setCommunities] = useState<any>([])
    const [missions, setMissions] = useState<any>([])
    const scrollToAll = useRef<any>(null);
    const scrollToCommunities = useRef<any>(null);
    const scrollToMissions = useRef<any>(null);
    const scrollToArtist = useRef<any>(null);

    useEffect( () => {
        getCommunities().then((res) => {
            setCommunities(res.data)
        })
        getMissions().then((res) => {
            setMissions(res.data)
            console.log(res.data)
        })
       
    }, [])

    const tabsSorting = [
        {
            title: "All",
            value: "all",
            anchor: scrollToAll,
        },
        {
            title: "NFTS",
            value: "communities",
            counter: "456,789",
            anchor: scrollToCommunities,
        },
        {
            title: "DEFI",
            value: "missions",
            counter: "123,987",
            anchor: scrollToMissions,
        },
        {
            title: "Creatives",
            value: "creatives",
            counter: "45,678",
            anchor: scrollToArtist,
        },
    ];
    return (
        <Layout layoutNoOverflow noRegistration>
            <Main scrollToRef={scrollToAll} />
            <Catalog
                title="Communities"
                tabsSorting={tabsSorting}
                tabsTime={tabsTime}
                filters={statuses}
                items={communities}
                scrollToRef={scrollToCommunities}
            />
            <Newsletter />
        </Layout>
    );
};

export default HomePage;

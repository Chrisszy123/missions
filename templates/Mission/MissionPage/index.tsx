import { useRef } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";
import Spotlight from "./Spotlight";
import Newsletter from "@/components/Newsletter";

const HomePage = () => {
    const scrollToAll = useRef<any>(null);
    return (
        <Layout layoutNoOverflow>
            <Main scrollToRef={scrollToAll} />
            <Spotlight />
            <Newsletter />
        </Layout>
    );
};

export default HomePage;

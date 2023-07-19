import { useRef } from "react";
import Layout from "@/components/Layout";
//import Main from "./Main";
import Spotlight from "./Spotlight";
//import Newsletter from "@/components/Newsletter";
interface MissionPageProps {
    missions:  any
}
const HomePage = ({missions}: MissionPageProps) => {
    //const scrollToAll = useRef<any>(null);
    return (
        <Layout layoutNoOverflow noRegistration>
            {/* <Main scrollToRef={scrollToAll} /> */}
            <Spotlight missions={missions}/>
            {/* <Newsletter /> */}
        </Layout>
    );
};

export default HomePage;

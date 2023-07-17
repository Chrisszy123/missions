import cn from "classnames";
/* import { Swiper, SwiperSlide } from "swiper/react"; */
import Link from "next/link";
import styles from "./Main.module.sass";
import Arrow from "@/components/Arrow";
/* import Item from "./Item"; */

/* const list = [
    {
        title: "The creator network.",
        collection: "Escape II",
        price: "10.00 ETH",
        reserve: "2.38 ETH",
        image: "/images/main-pic-1.jpg",
    },
    {
        title: "The creator network.",
        collection: "Escape I",
        price: "24.33 ETH",
        reserve: "5.64 ETH",
        image: "/images/main-pic-2.jpg",
        color: "#BCE6EC",
    },
    {
        title: "The creator network.",
        collection: "Escape III",
        price: "5.4 ETH",
        reserve: "1.45 ETH",
        image: "/images/auction-pic-2.jpg",
        color: "#B9A9FB",
    },
];
 */
/* import { Navigation, Scrollbar } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
 */
type MainProps = {};

const Main = ({}: MainProps) => (
    <>
        <div className={styles.row}>
            <div className={styles.col}>
<<<<<<< HEAD
                <h1 className={cn("hero", styles.title)}>Complete Missions</h1>
=======
                <h1 className={cn("hero", styles.title)}>Engage in Curated Missions.</h1>
>>>>>>> dd7be93c4f55bee33631f64db1ac7d74f210e217
                <Arrow className={styles.arrow} />
            </div>
            <div className={styles.col}>
                <div className={styles.content}>
                We're shaping the future of decentralized communities, where boundless opportunities await. Step into a world where collaboration and achievement take center stage, as community owners create captivating missions and users embark on thrilling quests.
                </div>
<<<<<<< HEAD
                <Link href="/communities">
=======
                <Link href="/help">
>>>>>>> dd7be93c4f55bee33631f64db1ac7d74f210e217
                    <a className={cn("button-empty", styles.search)}>
                        learn more
                    </a>
                </Link>
            </div>
        </div>
      {/*   <div className={styles.wrapper}>
            <Swiper
                navigation={true}
                loop={false}
                modules={[Navigation, Scrollbar]}
                className="vertical-swiper"
                direction="vertical"
                scrollbar={{
                    hide: true,
                }}
                speed={700}
                breakpoints={{
                    320: {
                        direction: "horizontal",
                    },
                    1024: {
                        direction: "vertical",
                    },
                }}
            >
                {list.map((x, index) => (
                    <SwiperSlide key={index}>
                        <Item item={x} key={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div> */}
    </>
);

export default Main;

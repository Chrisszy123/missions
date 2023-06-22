import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./Collections.module.sass";
import Collection from "./Collection";

import { curatedCollections } from "@/mocks/collections";
import { Navigation, Scrollbar } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

type CollectionsProps = {};

const Collections = ({}: CollectionsProps) => (
    <div className={styles.collections}>
        <div className={cn("h1", styles.title)}>Curated collections.</div>
        <div className={styles.wrapper}>
            <Swiper
                navigation={true}
                slidesPerView="auto"
                effect={"fade"}
                scrollbar={{
                    hide: true,
                }}
                modules={[Navigation, Scrollbar]}
                className="collections-swiper"
            >
                {curatedCollections.map((collection, index) => (
                    <SwiperSlide key={index}>
                        <Collection item={collection} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
);

export default Collections;

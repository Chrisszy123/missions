import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";

type PreviewProps = {};

const Preview = ({}: PreviewProps) => (
    <>
        <div className={styles.title}>Preview</div>
        <div className={styles.preview}>
            <div className={styles.image}></div>
            <div className={styles.category}></div>
        </div>
        <div className={styles.head}>
            <div className={cn("h4", styles.subtitle)}></div>
            <div className={styles.price}>0 NFT</div>
        </div>
    </>
);

export default Preview;

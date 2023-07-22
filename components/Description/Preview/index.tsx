import styles from "./Preview.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type PreviewProps = {
    image: string;
    alt: string;
};

const Preview = ({ image, alt }: PreviewProps) => (
    <div className={styles.preview} style={{height: "40%"}}>
        <Image src={image} layout="fill" objectFit="cover" alt={alt} className="h-32" />
        {/* <div className={styles.actions}>
            <button className={styles.action}>
                <Icon name="music" />
            </button>
            <button className={styles.action}>
                <Icon name="full-view" />
            </button>
        </div> */}
    </div>
);

export default Preview;

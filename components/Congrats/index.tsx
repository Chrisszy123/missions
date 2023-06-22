import Link from "next/link";
import cn from "classnames";
import styles from "./Congrats.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type CongratsProps = {
    title: string;
    content: any;
};

const Congrats = ({ title, content }: CongratsProps) => (
    <div className={styles.congrats}>
        <div className={styles.wrapper}>
            <Link href="/">
                <a className={cn("button-circle", styles.close)}>
                    <Icon name="close" />
                </a>
            </Link>
            <div className={styles.inner}>
                <div className={styles.preview}>
                    <div className={styles.image}>
                        <Image
                            src="/images/congrats.png"
                            width="100%"
                            height="100%"
                            layout="responsive"
                            objectFit="contain"
                            alt="Avatar"
                        />
                    </div>
                    <div className={styles.polygon}>
                        <div className={styles.background}>
                            <svg
                                width="0"
                                height="0"
                                style={{ display: "block" }}
                            >
                                <clipPath
                                    id="polygon"
                                    clipPathUnits="objectBoundingBox"
                                >
                                    <path d="M0.56734176,0.00289554786 C0.588460408,-0.00379357421 0.611542883,0.00129193347 0.627894867,0.016236395 L0.958957144,0.318801867 C0.975311066,0.333746135 0.982451374,0.356279281 0.97768471,0.37791238 L0.881186884,0.815905858 C0.87642022,0.837539926 0.860475146,0.854986693 0.839356498,0.861676493 L0.411795427,0.997104015 C0.390676779,1.00379382 0.367594303,0.998708404 0.35124232,0.983763168 L0.020177136,0.68119818 C0.00382466766,0.666253913 -0.00331254023,0.643720766 0.00145363969,0.622087667 L0.0979503025,0.184093898 C0.102716967,0.162460315 0.11866204,0.145012773 0.139780689,0.138323651 L0.56734176,0.00289554786 Z" />
                                </clipPath>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.confetti}>
                        <Image
                            src="/images/confetti.png"
                            width="100%"
                            height="100%"
                            layout="responsive"
                            objectFit="contain"
                            alt="Avatar"
                        />
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={cn("h1", styles.title)}>{title}</div>
                    <div className={styles.content}>{content}</div>
                    <div className={styles.btns}>
                        <Link href="/nft">
                            <a className={cn("button-large", styles.button)}>
                                View NFT
                            </a>
                        </Link>
                        <Link href="/share-nft">
                            <a
                                className={cn(
                                    "button-stroke-grey button-large",
                                    styles.button
                                )}
                            >
                                <span>share</span>
                                <Icon name="share" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Congrats;

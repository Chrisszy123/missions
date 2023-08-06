import Link from "next/link";
import cn from "classnames";
import styles from "./CreateWithCollectionPage.module.sass";
import Image from "@/components/Image";

const list = [
  {
    title: "Cute Planet", 
    price: "4 NFT",
    image: "/images/cute-planet.jpg",
    url: "/collection",
  },
  {
    title: "Escape",
    price: "12 NFT",
    image: "/images/escape.jpg",
    url: "/collection",
  },
];

const CreatPage = () => {
  return (
    <div>
      <div className={styles.head}>
        <div className={styles.subtitle}>Your Missions</div>
        <div className={styles.counter}>2</div>
      </div>
      <Link href="#">
        <a className={styles.add}>
          <div className={styles.plus}></div>
          Create new Mission
        </a>
      </Link>
      <div className={styles.list}>
        {list.map((item, index) => (
          <Link href={item.url} key={index}>
            <a className={styles.item}>
              <div className={styles.preview}>
                <Image
                  src={item.image}
                  layout="fill"
                  objectFit="cover"
                  alt="NFTs"
                />
              </div>
              <div className={styles.details}>
                <div className={styles.info}>{item.title}</div>
                <div className={styles.price}>{item.price}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className={styles.foot}>
        <Link href="#">
          <a className={styles.link}>Learn about Missions on Missions</a>
        </Link>
      </div>
    </div>
  );
};

export default CreatPage;

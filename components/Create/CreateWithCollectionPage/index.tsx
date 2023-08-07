import Link from "next/link";
import cn from "classnames";
import styles from "./CreateWithCollectionPage.module.sass";
import Image from "@/components/Image";
import MoonLoader from "react-spinners/MoonLoader";

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
interface UserMissionsProps {
  missions: any;
  status: any;
}

const UserMissions = ({ missions, status }: UserMissionsProps) => {
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
      {status === "loading" ? (
        <div className="flex justify-center items-center p-8">
          <MoonLoader
            loading={true}
            color="#000"
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className={styles.list}>
          {missions?.map((mission: any, index: any) => (
            <Link
              href={`communities/${mission?.communityId}/missions/${mission?.id}`}
              key={index}
            >
              <a className={styles.item}>
                <div className={styles.preview}>
                  <Image
                    src={
                      mission?.image
                        ? mission?.image
                        : "/images/cute-planet.jpg"
                    }
                    layout="fill"
                    objectFit="cover"
                    alt="NFTs"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>{mission?.name}</div>
                  <div className={styles.price}>{mission?.rewards[0]}</div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.foot}>
        <Link href="#">
          <a className={styles.link}>Learn about missions on Missions</a>
        </Link>
      </div>
    </div>
  );
};

export default UserMissions;

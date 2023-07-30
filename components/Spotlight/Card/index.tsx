import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";

type CardProps = {
  className?: string;
  item: any;
  nameStyle?: string
};

const Card = ({ className, item, nameStyle}: CardProps) => {
  return (
    <Link href={`communities/${item?.communityId}/missions/${item?.id}`}>
      <a className={cn(styles.card, className)}>
        <div className={styles.preview}>
          <Image
            src={item?.image ? item?.image : "/images/projects/image-1.jpg"}
            layout="fill"
            objectFit="cover"
            alt="missionlogo"
          />
        </div>
        <div className={styles.line}>
          <div className={styles.details}>
            <div className={cn(styles.title, nameStyle)}>{item.name}</div>
            <div className={cn(styles.price, "flex gap-2")}>
              <span>Enter</span> <div className={nameStyle}> {item.rewards}</div>
            </div>
          </div>
          {/* <Users className={styles.users} items={item.users} /> */}
        </div>
      </a>
    </Link>
  );
};
export default Card;

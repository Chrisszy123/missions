import Link from "next/link";
import cn from "classnames";
import styles from "./CreatePage.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Arrow from "@/components/Arrow";
import Icon from "@/components/Icon";

const CreatPage = () => {
  return (
    <div>
      <div className={styles.head}>
        <div className={styles.subtitle}>Your Communities</div>
        <div className={styles.counter}>0</div>
      </div>
      <Link href="#">
        <a className={styles.add}>
          <div className={styles.plus}></div>
          <div className={styles.info}>Create new communities</div>
          <div className={styles.text}>a</div>
        </a>
      </Link>
      <div className={styles.list}>
        {Array.from(Array(3).keys()).map((x) => (
          <div className={styles.item} key={x}>
            <div className={styles.preview}>
              <Icon name="picture" />
            </div>
            <div className={styles.lines}></div>
          </div>
        ))}
      </div>
      <div className={styles.foot}>
        <Link href="#">
          <a className={styles.link}>Learn about Communities on Missions</a>
        </Link>
      </div>
    </div>
  );
};

export default CreatPage;

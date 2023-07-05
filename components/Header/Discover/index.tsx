import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Discover.module.sass";
import Icon from "@/components/Icon";

export const create = [
  {
    title: "Create Community",
    url: "/communities/create",
  },
  // {
  //   title: "Create Mission",
  //   url: "/communities/missions/create",
  // },
];
export const discover = [
  {
    title: "Communities",
    url: "/communities",
  },
  {
    title: "Missions",
    url: "/missions",
  },
  {
    title: "About",
    url: "/about",
  },
];

type DiscoverProps = {
  className?: string;
  light?: boolean;
};

const Discover = ({ className, light }: DiscoverProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleD, setDVisible] = useState<boolean>(false);
  useHotkeys("esc", () => setVisible(false));
  useHotkeys("esc", () => setDVisible(false));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <OutsideClickHandler onOutsideClick={() => setDVisible(false)}>
        <div
          className={cn(
            styles.discover,
            { [styles.active]: visibleD },
            { [styles.light]: light },
            className
          )}
        >
          <button
            className={styles.head}
            onClick={() => setDVisible(!visibleD)}
          >
            Discover <Icon name="arrow-down" />
          </button>
          <div className={styles.body}>
            <div className={styles.list}>
              {discover.map((item, index) => (
                <Link href={item.url} key={index}>
                  <a className={styles.item}>
                    {item.title}
                    <Icon name="arrow-right-thin" />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div
          className={cn(
            styles.discover,
            { [styles.active]: visible },
            { [styles.light]: light },
            className
          )}
        >
          <button className={styles.head} onClick={() => setVisible(!visible)}>
            Create <Icon name="arrow-down" />
          </button>
          <div className={styles.body}>
            <div className={styles.list}>
              {create.map((item, index) => (
                <Link href={item.url} key={index}>
                  <a className={styles.item}>
                    {item.title}
                    <Icon name="arrow-right-thin" />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Discover;

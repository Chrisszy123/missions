import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Discover.module.sass";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";

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
    url: "/#",
  },
];

type DiscoverProps = {
  className?: string;
  light?: boolean;
  isCommunity?: boolean;
};

const Discover = ({ className, light, isCommunity }: DiscoverProps) => {
  const router = useRouter();
  const slug = router.query.Id;

  const [visible, setVisible] = useState<boolean>(false);
  const [visibleD, setDVisible] = useState<boolean>(false);
  const [visibleA, setAVisible] = useState<boolean>(false);
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
      <div
        className={cn(
          styles.discover,
          { [styles.active]: visibleD },
          { [styles.light]: light },
          className
        )}
      >
        <button className={styles.head} onClick={() => setDVisible(!visibleD)}>
          <Link href="/communities">communities</Link>
        </button>
      </div>

      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div
          className={cn(
            styles.discover,
            { [styles.active]: visible },
            { [styles.light]: light },
            className
          )}
        >
          {isCommunity ? (
            <Link href={`/communities/${slug}/missions/create`}>
              <div className={styles.head} style={{ cursor: "pointer" }}>
                Create Mission
              </div>
            </Link>
          ) : (
            <button
              className={styles.head}
              onClick={() => setVisible(!visible)}
            >
              <Link href="/communities/create">Create Community</Link>
            </button>
          )}
          {/* <div className={styles.body}>
            <div className={styles.list}>
              <Link href="/communities/create">
                <div className={styles.item} style={{cursor: "pointer"}}>
                  Create Community
                  <Icon name="arrow-right-thin" />
                </div>
              </Link>
              {isCommunity ? (
                <Link href={`/communities/${slug}/missions/create`}>
                  <div className={styles.item} style={{cursor: "pointer"}}>
                    Create Mission
                    <Icon name="arrow-right-thin" />
                  </div>
                </Link>
              ) : null}
            </div>
          </div> */}
        </div>
      </OutsideClickHandler>

      <div
        className={cn(
          styles.discover,
          { [styles.active]: visibleA },
          { [styles.light]: light },
          className
        )}
      >
        <button className={styles.head} onClick={() => setAVisible(!visibleA)}>
          <Link href="#">
            about
            {/*  <Icon name="arrow-down" /> */}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Discover;

import Link from "next/link";
import cn from "classnames";
import styles from "./Hot.module.sass";
import Icon from "@/components/Icon";
import Item from "./Item";

import { hotArtists } from "@/mocks/hotArtists";

type HotProps = {};

const Hot = ({}: HotProps) => (
  <div className={styles.row}>
    <div className={styles.col}>
      <div className={styles.details}>
        <div className={styles.line}>
          <div className={cn("h1", styles.title)}>
          Unveiling the Extraordinary
          </div>
          <Link href="/discover/ranking">
            <a className={styles.link}>
              <Icon name="arrow-right" />
            </a>
          </Link>
        </div>
        <div className={styles.content}>
          Meet our Top Achievers, the trailblazers who have conquered missions
          and emerged as champions. Join us in celebrating their remarkable
          accomplishments and be inspired by their dedication and success.
        </div>
      </div>
    </div>
    <div className={styles.col}>
      <div className={styles.artists}>
        {hotArtists.map((artist, index) => (
          <Item item={artist} key={index} number={index} />
        ))}
      </div>
      <svg width="0" height="0" style={{ display: "block" }}>
        <clipPath id="polygonNumber" clipPathUnits="objectBoundingBox">
          <path d="M.396.076C.46.041.54.041.604.076l.242.129A.19.19 0 0 1 .95.371v.258a.19.19 0 0 1-.104.166L.604.924C.54.959.46.959.396.924L.154.795A.19.19 0 0 1 .05.629V.371A.19.19 0 0 1 .154.205L.396.076z" />
        </clipPath>
      </svg>
      <div className={styles.btns}>
        <Link href="/discover/ranking">
          <a className={cn("button-wide", styles.button)}>EXPLORE LEADERBOARDS</a>
        </Link>
      </div>
    </div>
  </div>
);

export default Hot;

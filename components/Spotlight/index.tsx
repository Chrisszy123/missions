import { useState } from "react";
import cn from "classnames";
import styles from "./Spotlight.module.sass";
import Tabs from "@/components/Tabs";
import Card from "./Card";
import { tabs } from "@/mocks/spotlight";
import MoonLoader from "react-spinners/MoonLoader";

type SpotlightProps = {
  missions: any;
  title?: string;
  style?: any;
  titleStyle?: string;
  nameStyle?: string;
  btnStyle?: string;
  status?: any;
};

const Spotlight = ({
  missions,
  title,
  style,
  titleStyle,
  nameStyle,
  btnStyle,
  status,
}: SpotlightProps) => {
  const [sorting, setSorting] = useState<string>("1-days");
  return (
    <>
      <div className={cn(styles.spotlight, style)}>
        <div className={styles.head}>
          <div className={styles.details}>
            <div className={cn("h1", styles.title, titleStyle)}>{title}.</div>
            <div className={styles.info}>Missions you&apos;ll love</div>
          </div>
          <Tabs
            className={styles.tabs}
            items={tabs}
            value={sorting}
            setValue={setSorting}
            dark
          />
        </div>
        {status === "loading" ? (
          <div className="flex justify-center items-center p-8">
            <MoonLoader
              loading={true}
              color="#fff"
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {missions?.map((card: any, index: any) => (
                <Card
                  className={styles.card}
                  item={card}
                  key={index}
                  nameStyle={nameStyle}
                />
              ))}
            </div>
            <div className={styles.btns}>
              <button
                className={cn(
                  "button-white button-counter",
                  styles.button,
                  btnStyle
                )}
              >
                Load more
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Spotlight;

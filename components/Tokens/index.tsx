import { useState } from "react";
import cn from "classnames";
import styles from "./Tokens.module.sass";
import Users from "@/components/Users";
import Actions from "@/components/Actions";
import Token from "@/components/Token";
import Spinner from "@/components/Spinner";

type TokensProps = {
  titleUsers?: string;
  items: any;
  users: any;
  theme: any;
  setTheme: any;
};

const Tokens = ({ items, titleUsers, users, theme, setTheme }: TokensProps) => {
  const [sorting, setSorting] = useState<string>("grid");
  const sortedItems = items.sort((a: any, b: any) => {
    if (a.state === "OPEN" && b.state !== "OPEN") {
      return -1; // a should come before b
    } else if (a.status !== "OPEN" && b.status === "OPEN") {
      return 1; // b should come before a
    }
    return 0; // the order doesn't matter
  });
  return (
    <>
      <div className={styles.head}>
        {/* <Users
          classUsersItem={styles.user}
          classUsersCounter={styles.counter}
          title={titleUsers}
          items={users}
          dark={theme}
          border
        /> */}
        {/*     <Actions
                    sortingValue={sorting}
                    setSortingValue={setSorting}
                    theme={theme}
                    setTheme={setTheme}
                    dark={theme}
                /> */}
      </div>
      <div
        className={cn(styles.tokens, {
          [styles.list]: sorting === "list",
        })}
      >
        {sortedItems.map((mission: any, index: number) => (
          <Token
            className={styles.token}
            item={mission}
            key={index}
            large={sorting === "list"}
            dark={theme}
          />
        ))}
      </div>
      {/* <Spinner dark={theme} /> */}
    </>
  );
};

export default Tokens;

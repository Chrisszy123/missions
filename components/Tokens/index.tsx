import { useContext, useState } from "react";
import cn from "classnames";
import styles from "./Tokens.module.sass";
import Users from "@/components/Users";
import Actions from "@/components/Actions";
import Token from "@/components/Token";
import Spinner from "@/components/Spinner";
import Icon from "../Icon";
import { AuthContext } from "context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

type TokensProps = {
  titleUsers?: string;
  items: any;
  users: any;
  theme: any;
  setTheme: any;
  owner?: string;
};

const Tokens = ({
  items,
  titleUsers,
  users,
  theme,
  setTheme,
  owner,
}: TokensProps) => {
  const { user }: any = useContext(AuthContext);
  const router = useRouter();
  const communityId = router.query.Id;
  const userId = user?.message?.data?.id;
  const [sorting, setSorting] = useState<string>("grid");
  const sortedItems = items.sort((a: any, b: any) => {
    if (a.state === "OPEN" && b.state !== "OPEN") {
      return -1; // a should come before b
    } else if (a.status !== "OPEN" && b.status === "OPEN") {
      return 1; // b should come before a
    }
    return 0; // the order doesn't matter
  });
  if (items.length <= 0) {
    return (
      <div className="flex flex-col justify-center bg-zinc-900 items-center rounded-lg h-[100%] w-[100%] p-16 capitalize gap-4">
        {owner === userId ? (
          <>
            <div className={cn("h2", styles.user, "text-[30px] text-white")}>
              There are no missions
            </div>
            <span className="text-white opacity-30 text-center mb-2">
              To get started with Missions, click on the button below to create
              mission
            </span>
            <div className="flex justify-center items-center gap-2">
              <Link href={`/communities/${communityId}/missions/create`}>
                <a
                  className={cn(
                    "button-white",
                    styles.button,
                    "m-0 cursor-pointer"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Create Mission</span>
                  <Icon name="arrow-right" />
                </a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={cn("h2", styles.user, "text-[30px] text-white")}>
              There are no missions
            </div>
            <span className="text-white opacity-30 text-center mb-2">
              You can participate in a mission once the creator creates one.
            </span>
          </>
        )}
      </div>
    );
  }
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

import Link from "next/link";
import cn from "classnames";
import styles from "./CreatePage.module.sass";
import MoonLoader from "react-spinners/MoonLoader";

interface UserCommunitiesProps {
  communities: any;
  status: any;
}
const UserCommunities = ({ communities, status }: UserCommunitiesProps) => {
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
          {communities?.map((community: any, index: any) => (
            <Link
              href={`communities/${community?.id}`}
              className="cursor-pointer"
              key={index}
            >
              <div className={cn(styles.item, "cursor-pointer")} >
                <img src={community?.image} className={styles.preview}>
                  {/* <Icon name="picture" /> */}
                </img>
                <div className={cn(styles.lines, "gap-4")}>
                  <div className="text-[14px] bg-gray-200 w-[fit-content] px-4 py-1 rounded-lg font-semibold">
                    {community?.name}
                  </div>
                  <div className="text-[12px] bg-gray-200 w-full px-4 py-1 rounded-lg font-semibold">
                    {community?.link}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.foot}>
        <Link href="#">
          <a className={styles.link}>Learn about Communities on Missions</a>
        </Link>
      </div>
    </div>
  );
};

export default UserCommunities;

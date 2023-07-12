import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from "./Preview";
import { createMission, getUsers } from "@/utils/axios";
import { AuthContext } from "context/AuthContext";
import { WalletContext } from "context/WalletContext";
import { z } from "zod";
import { missionSchema } from "@/types/missions";

type MissionData = z.infer<typeof missionSchema>;
//modal

const CreatPage = () => {
  const [name, setName] = useState<string>("");
  const [rewards, setRewards] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<object[] | null>([]);
  const [userId, setUserId] = useState<any>("");
  const [communityId, setCommunityId] = useState<string>("");

  const { account }: any = useContext(WalletContext);
  // create a new user
  const walletAddress = account?.toString().toLowerCase();

  const router = useRouter();
  const slug = router.asPath;

  const extractSubstring = () => {
    const regex = /\/communities\/([^/]+)\//;
    const match = slug.match(regex);

    if (match && match[1]) {
      const extractedString = match[1];
      setCommunityId(extractedString);
    } else {
      console.log("Substring not found");
    }
  };
  useEffect(() => {
    getUsers().then((e) => {
      const filteredUser = e?.message?.data.filter(
        (user: any) => user?.walletAddress === walletAddress
      );
      console.log(filteredUser);
      setUserId(filteredUser[0]?.id);
    });
    extractSubstring();
  }, [walletAddress]);

  const { setMissionName, SetMissionRewards, setMDesc }: any =
    useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError(null);
      const data = {
        name: name,
        rewards: rewards,
        desc: desc,
        userId: userId,
        communityId: communityId,
      };
      const missionData = missionSchema.parse(data);
      const mission = await createMission(missionData);
      // use data to redirect
      if (mission?.status === true) {
        router.push("/congrats");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      <LayoutCreate
        left={
          <>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>
                Create a <br></br>Mission.
              </div>
              <Link href="">
                <a className={cn("button-circle", styles.back)}>
                  <Icon name="arrow-left" />
                </a>
              </Link>
            </div>
            <div className={styles.info}>Create a Mission on o1Node</div>
            <form
              className={styles.form}
              action=""
              onSubmit={(e) => handleSubmit(e)}
            >
              <Field
                className={styles.field}
                placeholder="Name"
                icon="profile"
                value={name}
                onChange={(e: any) => {
                  setName(e.target.value);
                  setMissionName(e.target.value);
                }}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Rewards"
                icon="profile"
                value={rewards}
                onChange={(e: any) => {
                  setRewards(e.target.value);
                  SetMissionRewards(e.target.value);
                }}
                large
                required
              />
              {/* <Field
                className={styles.field}
                placeholder="Missions Category"
                icon="profile"
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                large
                required
              /> */}
              <Field
                className={styles.field}
                placeholder="Description"
                icon="email"
                type="text"
                value={desc}
                onChange={(e: any) => {
                  setDesc(e.target.value);
                  setMDesc(e.target.value);
                }}
                large
                required
                textarea
              />
              <button type="submit">
                <a className={cn("button-large", styles.button)}>
                  <span>Continue</span>
                  <Icon name="arrow-right" />
                </a>
              </button>
              {/* {error &&
                error.map((err: any) => (
                  <span style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{err.path[0]}: {err.message}</span>
                ))} */}
            </form>
          </>
        }
      >
        <Preview />
      </LayoutCreate>
    </Layout>
  );
};

export default CreatPage;

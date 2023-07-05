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
//modal


const CreatPage = () => {
  const [name, setName] = useState<string>("");
  const [rewards, setRewards] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<any>(false);
  const [userId, setUserId] = useState<any>("");

  const { user }: any = useContext(AuthContext);
  const useremail = user?.email;

  const router = useRouter()

  useEffect(() => {
    getUsers().then((e) => {
      const filteredUser = e.message.data.filter(
        (user: any) => user.email === useremail
      );
      console.log(filteredUser);
      setUserId(filteredUser[0]?.id);
    });
  }, [useremail])
  
 // <Link href="/communities/create/congrats">
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const missionData = {
        name: name,
        rewards: rewards,
        category: category,
        desc: desc,
        userId: userId,
        communityId: "90ba9d4b-83eb-4668-a944-4ee7486d4349",
      };
      const mission = await createMission(missionData);
      // use data to redirect
      if(mission?.status === true){
        router.push('/congrats')
      }
    } catch (err: any) {
      throw new Error("Errors submitting mission data" + err);
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
            <div className={styles.info}>
              Create a Mission on o1Node
            </div>
            <form
              className={styles.form}
              action=""
              onSubmit={(e) => handleSubmit(e)}
            >
              <Field
                className={styles.field}
                placeholder="Mission name"
                icon="profile"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Missions Rewards"
                icon="profile"
                value={rewards}
                onChange={(e: any) => setRewards(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Missions Category"
                icon="profile"
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Mission Desc"
                icon="email"
                type="text"
                value={desc}
                onChange={(e: any) => setDesc(e.target.value)}
                large
                required
              />
                <button type="submit">
                  <a className={cn("button-large", styles.button)}>
                    <span>Continue</span>
                    <Icon name="arrow-right" />
                  </a>
                </button>
                {error ? <div style={{color: 'red', }}>Error creating Mission</div> : ""} 
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

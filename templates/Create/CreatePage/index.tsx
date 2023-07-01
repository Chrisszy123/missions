import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from "./Preview";
import { createCommunity, getUsers } from "@/utils/axios";
import { AuthContext } from "context/AuthContext";
//modal


const CreatPage = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [secondaryLink, setSecondaryLink] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<any>(false);
  const [userId, setUserId] = useState<any>()

  const { user }: any = useContext(AuthContext);
  const useremail = user?.email;
  getUsers().then((e: any) => {
    const filteredUser = e.message.data.filter(
      (user: any) => user.email === useremail
    );
    console.log(filteredUser);
    setUserId(filteredUser[0].id);
  });
  
 // <Link href="/communities/create/congrats">
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const communityData = {
        name: name,
        tags: tags,
        link: link,
        secondaryLink: secondaryLink,
        desc: desc,
        userId: userId,
      };
      const comm = await createCommunity(communityData);
      // use data to redirect
      if(comm?.status === true){
        setError(true)
      }
    } catch (err: any) {
      throw new Error("errors submitting community data" + err);
    }
  };
  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      <LayoutCreate
        left={
          <>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>
                Create a <br></br>Community.
              </div>
              <Link href="">
                <a className={cn("button-circle", styles.back)}>
                  <Icon name="arrow-left" />
                </a>
              </Link>
            </div>
            <div className={styles.info}>
              Create a community on o1Node to be able to create Missions.
            </div>
            <form
              className={styles.form}
              action=""
              onSubmit={(e) => handleSubmit(e)}
            >
              <Field
                className={styles.field}
                placeholder="Community name"
                icon="profile"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Community Link"
                icon="profile"
                value={link}
                onChange={(e: any) => setLink(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Secondary Link"
                icon="profile"
                value={secondaryLink}
                onChange={(e: any) => setSecondaryLink(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Community Tags"
                icon="profile"
                value={tags}
                onChange={(e: any) => setTags(e.target.value)}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Community Desc"
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

                {error ? <div style={{color: 'red', }}>Error creating Community</div> : ""}
              
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

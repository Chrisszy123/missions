import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from "./Preview";
import { updateCommunity } from "@/utils/axios";

const CreatPage = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [secondaryLink, setSecondaryLink] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [userId, setUserId] = useState<any>("");
  useEffect(() => {
    const userId: string | null = localStorage.getItem("userId");
    setUserId(userId)
  }, [])
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
        userId: userId
      };
      await updateCommunity(communityData);
    } catch (err: any) {
      throw new Error("errors submitting community data" + err);
    }
  };
  return (
    <Layout layoutNoOverflow footerHide emptyHeader>
      <LayoutCreate
        left={
          <>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>
                Edit <br></br>Community.
              </div>
              <Link href="">
                <a className={cn("button-circle", styles.back)}>
                  <Icon name="arrow-left" />
                </a>
              </Link>
            </div>
            <div className={styles.info}>
             Edit your o1node community
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

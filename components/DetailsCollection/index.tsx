import cn from "classnames";
import styles from "./DetailsCollection.module.sass";
import style from "@/templates/Create/CreatePage/CreateStep1Page.module.sass";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Modal from "react-modal";
import Preview from "@/templates/Create/CreatePage/Preview";
import LayoutCreate from "@/components/LayoutCreate";
import Field from "@/components/Field";
import { AuthContext } from "context/AuthContext";
import { getUsers, updateCommunity } from "@/utils/axios";

type DetailsType = {
  name: string;
  desc: string;
  secondaryLink: string;
  link: string;
  tags: string[];
};

type DetailsProps = {
  details: DetailsType[];
};

const Details = ({ details }: DetailsProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
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

  const router = useRouter()
  const communityId = router.query.Id

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
        id: communityId
      };
      const comm = await updateCommunity(communityData);
      //use data to redirect
      if(comm?.status === true){
        setError(true)
      }else{
        router.push(`/communities/${communityId}`)
      }
    } catch (err: any) {
      throw new Error("errors submitting community data" + err);
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.details}>
      {details.map((item, key) => (
        <>
          <div className={styles.head}>
            <div className={styles.box}>
              <div className={cn("h2", styles.user)}>{item.name}</div>
              <div className={styles.line}>
                <div className={styles.category}>{item.tags[0]}</div>
                <div className={styles.code}>
                  {item.link}
                  <button className={styles.copy}>
                    <Icon name="copy" />
                  </button>
                </div>
              </div>
            </div>

            <button
              className={cn("button-stroke-grey button-medium", styles.button)}
              onClick={openModal}
            >
              <span>edit</span>
              <Icon name="edit" />
              
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={{
                  overlay: {
                    zIndex: "1",
                  },
                }}
              >
                <button onClick={closeModal}>
                  <a className={cn("button-circle", style.back)}>
                    <Icon name="arrow-left" />
                  </a>
                </button>
                <LayoutCreate
                  left={
                    <>
                      <div className={style.head}>
                        <div className={cn("h1", style.title)}>
                          Edit <br></br>Community.
                        </div>
                      </div>
                      <div className={style.info}>Edit Community</div>
                      <form
                        className={style.form}
                        action=""
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <Field
                          className={style.field}
                          placeholder="Community name"
                          icon="profile"
                          value={name}
                          onChange={(e: any) => setName(e.target.value)}
                          large
                          required
                        />
                        <Field
                          className={style.field}
                          placeholder="Community Link"
                          icon="profile"
                          value={link}
                          onChange={(e: any) => setLink(e.target.value)}
                          large
                          required
                        />
                        <Field
                          className={style.field}
                          placeholder="Secondary Link"
                          icon="profile"
                          value={secondaryLink}
                          onChange={(e: any) =>
                            setSecondaryLink(e.target.value)
                          }
                          large
                          required
                        />
                        <Field
                          className={style.field}
                          placeholder="Community Tags"
                          icon="profile"
                          value={tags}
                          onChange={(e: any) => setTags(e.target.value)}
                          large
                          required
                        />
                        <Field
                          className={style.field}
                          placeholder="Community Desc"
                          icon="email"
                          type="text"
                          value={desc}
                          onChange={(e: any) => setDesc(e.target.value)}
                          large
                          required
                        />
                        <button type="submit">
                          <a className={cn("button-large", style.button)}>
                            <span>Continue</span>
                            <Icon name="arrow-right" />
                          </a>
                        </button>

                        {error ? (
                          <div style={{ color: "red" }}>
                            Error creating Community
                          </div>
                        ) : (
                          ""
                        )}
                      </form>
                    </>
                  }
                >
                  <Preview />
                </LayoutCreate>
              </Modal>
          </div>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.label}>
                <Icon name="profile-fat" />
              </div>
              <div className={cn("h4", styles.value)}></div>
            </div>
          </div>
          <div className={styles.foot}>
            <div className={styles.stage}>Description</div>
            <div className={styles.content}>{item.desc}</div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Details;

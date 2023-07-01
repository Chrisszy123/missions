import cn from "classnames";
import styles from "./Caption.module.sass";
import Icon from "@/components/Icon";
import Preview from "@/templates/Create/CreatePage/Preview";
import style from "@/templates/Create/CreatePage/CreateStep1Page.module.sass";
import ReactModal from "react-modal";
import LayoutCreate from "@/components/LayoutCreate";
import Field from "@/components/Field";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "context/AuthContext";
import { getUsers, updateMission } from "@/utils/axios";

type CaptionProps = {
  title?: string;
  date?: string;
};

const Caption = ({ title, date }: CaptionProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [rewards, setRewards] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<any>(false);

  const [userId, setUserId] = useState<any>();

  const { user }: any = useContext(AuthContext);
  const useremail = user?.email;
  getUsers().then((e: any) => {
    const filteredUser = e.message.data.filter(
      (user: any) => user.email === useremail
    );
    console.log(filteredUser);
    setUserId(filteredUser[0]?.id);
  });

  const router = useRouter();
  const missionId = router.query.Id;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const missionData = {
        name: name,
        rewards: rewards,
        category: category,
        desc: desc,
        userId: userId,
        id: missionId,
        communityId: "90ba9d4b-83eb-4668-a944-4ee7486d4349",
      };
      const mission = await updateMission(missionData);
      // use data to redirect
      if (mission?.status === true) {
        setError(true);
      }else{
        router.push(`/missions/${missionId}`)
      }
    } catch (err: any) {
      throw new Error("errors submitting mission data" + err);
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.caption}>
      <div className={styles.line}>
        <div className={cn("h2", styles.title)}>{title}</div>
        <div className={styles.actions}>
          <button
            className={cn("button-circle button-medium", styles.button)}
            onClick={openModal}
          >
            <Icon name="edit" />
          </button>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={{
              overlay: {
                zIndex: "100",
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
                      Edit <br></br>Mission.
                    </div>
                  </div>
                  <div className={style.info}>Edit Mission</div>
                  <form
                    className={style.form}
                    action=""
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <Field
                      className={style.field}
                      placeholder="Mission name"
                      icon="profile"
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                      large
                      required
                    />
                    <Field
                      className={style.field}
                      placeholder="Mission Category"
                      icon="profile"
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      large
                      required
                    />
                    <Field
                      className={style.field}
                      placeholder="Mission Rewards"
                      icon="profile"
                      value={rewards}
                      onChange={(e: any) => setRewards(e.target.value)}
                      large
                      required
                    />
                    <Field
                      className={style.field}
                      placeholder="Mission Desc"
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
                      <div style={{ color: "red" }}>Error updating mission</div>
                    ) : (
                      ""
                    )}
                  </form>
                </>
              }
            >
              <Preview />
            </LayoutCreate>
          </ReactModal>
          <a
            className={cn("button-circle button-medium", styles.button)}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="share" />
          </a>
        </div>
      </div>
      <div className={styles.date}>
        <Icon name="external-link" />
        {date}
      </div>
    </div>
  );
};

export default Caption;

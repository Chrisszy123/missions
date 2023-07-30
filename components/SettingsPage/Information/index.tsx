import { useState } from "react";
import styles from "./Information.module.sass";
import Field from "@/components/Field";
import cn from "classnames";
import Icon from "@/components/Icon";

type InformationProps = {};

const Information = ({}: InformationProps) => {
  // get the user data from the db and pass it as default names
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");

  return (
    <div className={styles.information}>
      <div className={styles.fieldset}>
        <Field
          className={styles.field}
          label="Email"
          icon="email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Display name"
          icon="profile"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Short bio"
          placeholder="About you"
          icon="list-open"
          value={bio}
          onChange={(e: any) => setBio(e.target.value)}
          textarea
          required
        />
      </div>
      <div className={styles.label}>links</div>
      <div className={styles.socials}>
        {/* <Field
                    className={styles.field}
                    label="Website"
                    icon="link"
                    value={site}
                    onChange={(e: any) => setSite(e.target.value)}
                    required
                /> */}
        <Field
          className={styles.field}
          label="Twitter"
          icon="twitter"
          value={twitter}
          onChange={(e: any) => setTwitter(e.target.value)}
          required
        />
        <Field
          className={styles.field}
          label="Facebook"
          icon="facebook"
          value={facebook}
          onChange={(e: any) => setFacebook(e.target.value)}
          required
        />
      </div>
      <button className={cn("button-large", styles.button , "mt-6")}>
        <span>Save</span>
        <Icon name="check" />
      </button>
    </div>
  );
};

export default Information;

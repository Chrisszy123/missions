import { useContext, useState } from "react";
import styles from "./Information.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import cn from "classnames";
import { updateUser } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "context/AuthContext";
import MoonLoader from "react-spinners/MoonLoader";
import toast from 'react-hot-toast';
const AlertInput = ({ children }: { children: React.ReactNode }) =>
  Boolean(children) ? (
    <span role="alert" style={{ color: "tomato" }}>
      {children}
    </span>
  ) : null;

const UserSchema = z.object({
  bio: z.string().min(5),
  username: z.string().min(5),
  email: z.string().email(),
});
type UserType = z.infer<typeof UserSchema>;
type InformationProps = {};

const Information = ({}: InformationProps) => {
  const [site, setSite] = useState<string>("https://ui8.net");
  const [twitter, setTwitter] = useState<string>("https://twitter.com/ui8");
  const [facebook, setFacebook] = useState<string>("https://facebook.com/ui8");
  const queryClient = useQueryClient();
  const { user }: any = useContext(AuthContext);
  //const router = useRouter()
  const { status, error, mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["user", newUser], newUser);
      //   setCreatedCommunity(newCommunity?.message);
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<UserType>({
    resolver: zodResolver(UserSchema),
  });
  const updateUserInfo = (userData: UserType) => {
    mutate({
      id: user?.message?.data?.id,
      username: userData.username,
      email: userData.email,
      bio: userData.bio,
    });
  };
  return (
    <form
      className={styles.information}
      onSubmit={handleSubmit(updateUserInfo)}
      noValidate
    >
      <div className={styles.fieldset}>
        <Field
          className={styles.field}
          label="Email"
          icon="email"
          type="email"
          register={register("email")}
          required
        />
        <AlertInput>{errors?.email?.message}</AlertInput>
        <Field
          className={styles.field}
          label="username"
          icon="profile"
          register={register("username")}
          required
        />
        <AlertInput>{errors?.username?.message}</AlertInput>
        <Field
          className={styles.field}
          label="Short bio"
          placeholder="Bio"
          icon="list-open"
          register={register("bio")}
          textarea
          required
        />
        <AlertInput>{errors?.bio?.message}</AlertInput>
      </div>
      <div className={styles.label}>links</div>
      <div className={styles.socials}>
        <Field
          className={styles.field}
          label="Website"
          icon="link"
          value={site}
          onChange={(e: any) => setSite(e.target.value)}
          required
        />
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
      <button
        className={cn("button-large", styles.button, "mt-8 bg-black")}
        type="submit"
      >
        <span>Save</span>
        <Icon name="check" />
      </button>
      {status === "loading" ? (
        <MoonLoader
        loading={true}
        color="#000"
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      ): null}
      {status === "success"? toast.success("profile successfully updated") : null}
    </form>
  );
};

export default Information;

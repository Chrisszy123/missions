import { useState, useContext } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from "@/components/Preview";
import { createCommunity } from "@/utils/axios";
import { storage } from "@/utils/firebase";
import { v4 } from "uuid";
import { AuthContext } from "context/AuthContext";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useFilePreview from "@/hooks/useFilePreview";


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// const formatErrors = (errors: Record<string, FieldError>) =>
//   Object.keys(errors).map((key) => ({
//     key,
//     message: errors[key].message,
//   }));

/* ---------- Some UI components ----------*/

type AlertType = "error" | "warning" | "success";

// Global Alert div.
const Alert = ({ children, type }: { children: string; type: AlertType }) => {
  const backgroundColor =
    type === "error" ? "tomato" : type === "warning" ? "orange" : "powderBlue";

  return <div style={{ padding: "0 10", backgroundColor }}>{children}</div>;
};

// Use role="alert" to announce the error message.
const AlertInput = ({ children }: { children: React.ReactNode }) =>
  Boolean(children) ? (
    <span role="alert" style={{ color: "tomato" }}>
      {children}
    </span>
  ) : null;

const CommunitySchema = z.object({
  desc: z.string().min(5),
  name: z.string().min(5),
  link: z.string().url(),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  // tags: z.string().array(),
});

type CommunityType = z.infer<typeof CommunitySchema>;

const CreatePage = () => {
  const [image, setImage] = useState<any>("");
  const [error, setError] = useState<any>(false);
  const router = useRouter();
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [inputData, setInputData] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<CommunityType>({
    resolver: zodResolver(CommunitySchema),
  });

  const imageWatch = useWatch({
    control,
    name: "image",
    defaultValue: null,
  });

  const name = useWatch({
    control,
    name: "name",
    defaultValue: "",
  });

  const desc = useWatch({
    control,
    name: "desc",
    defaultValue: "",
  });

  const { imageUrl } = useFilePreview(imageWatch);


  const handleClick = () => {
    if (inputData.trim() !== "") {
      setDataArray((prevDataArray) => [...prevDataArray, inputData]);
      setInputData("");
      setCommTags(dataArray);
      console.log(dataArray); // Print the updated array
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const {
    user,
    setCommImage,
    setCommTags,
  }: any = useContext(AuthContext);

  const uploadFile = (img: any) => {
    if (img == null) return;
    const imageRef = ref(storage, `communities/${img.name + v4()}`);
    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setImage(url);
          setCommImage(url);
        })
        .catch((err: any) => console.log(err));
    });
  };

  const onSubmit = async (community: CommunityType) => {
    await uploadFile(community.image[0]);
    return new Promise(async (resolve, reject) => {

      const communityData = {
        name: community.name,
        tags: dataArray,
        link: community.link,
        image: image,
        desc: community.desc,
        userId: user?.message?.data?.id,
        ownerId: user?.message?.data?.id,
      };
      if(communityData.image === "" || undefined || null) return
      const comm = await createCommunity(communityData);
      console.log(comm);
      // use data to redirect
      if (comm?.status === true) {
        router.push("/congrats");
      }
      console.log("dans onSubmit", community);
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
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
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Field
                className={styles.field}
                type="file"
                icon="profile"
                large
                required
                register={register("image")}
              />
              <AlertInput>{errors?.image?.message?.toString()}</AlertInput>
              <Field
                className={styles.field}
                placeholder="Name"
                icon="profile"
                large
                register={register("name")}
                aria-invalid={Boolean(errors.name)}
              />
              <AlertInput>{errors?.name?.message}</AlertInput>

              <Field
                className={styles.field}
                placeholder="URL"
                icon="profile"
                large
                register={register("link")}
              />
              <AlertInput>{errors?.link?.message}</AlertInput>

              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                {" "}
                Tags:
                {dataArray.map((e: any, index) => (
                  <div key={index}>{e}</div>
                ))}
              </div>
              <Field
                className={styles.field}
                placeholder="Tags"
                icon="plus"
                // register={register("tags")}
                value={inputData}
                onChange={handleInputChange}
                onClick={handleClick}
                large
              />
              {/* <AlertInput>{errors?.tags?.message}</AlertInput> */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              ></div>
              <Field
                className={styles.field}
                placeholder="Description"
                icon="email"
                textarea
                large
                register={register("desc")}
              />
              <AlertInput>{errors?.desc?.message}</AlertInput>

              <button type="submit">
                <a className={cn("button-large", styles.button)}>
                  <span>Continue</span>
                  <Icon name="arrow-right" />
                </a>
              </button>

              {isSubmitting && (
                <Alert type="success">Creating Community...</Alert>
              )}

              {Boolean(Object.keys(errors)?.length) && (
                <div>
                  There are errors, please correct them before submitting the
                  form
                </div>
              )}

              {error ? (
                <div style={{ color: "red" }}>Error creating Community</div>
              ) : (
                ""
              )}
            </form>
          </>
        }
      >
        <Preview imageUrl={imageUrl} name={name} desc={desc} />
      </LayoutCreate>
    </Layout>
  );
};

export default CreatePage;

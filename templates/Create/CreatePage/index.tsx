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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useFilePreview from "@/hooks/useFilePreview";
import Congrats from "@/components/Congrats";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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



};

export default CreatePage;

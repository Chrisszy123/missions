import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from "./Preview";

const CreatPage = () => {
    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");

    return (
        <Layout layoutNoOverflow footerHide emptyHeader>
            <LayoutCreate
                left={
                    <>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                Create a <br></br>Collection.
                            </div>
                            <Link href="/create">
                                <a className={cn("button-circle", styles.back)}>
                                    <Icon name="arrow-left" />
                                </a>
                            </Link>
                        </div>
                        <div className={styles.info}>
                            Deploy a smart contract to showcase a series of NFT
                            artworks.
                        </div>
                        <form
                            className={styles.form}
                            action=""
                            onSubmit={() => console.log("Submit")}
                        >
                            <Field
                                className={styles.field}
                                placeholder="Collection name"
                                icon="profile"
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                large
                                required
                            />
                            <Field
                                className={styles.field}
                                placeholder="Collection symbol"
                                icon="email"
                                type="email"
                                value={symbol}
                                onChange={(e: any) => setSymbol(e.target.value)}
                                large
                                required
                            />
                            <Link href="/create/step-2">
                                <a
                                    className={cn(
                                        "button-large",
                                        styles.button
                                    )}
                                >
                                    <span>Continue</span>
                                    <Icon name="arrow-right" />
                                </a>
                            </Link>
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

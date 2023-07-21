import { useState } from "react";
import Image, {ImageProps} from "next/image";
import cn from "classnames";
import styles from "./Image.module.sass";

const NextImage = ({ className, ...props }: ImageProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Image
            className={cn(styles.image, { [styles.loaded]: loaded }, className)}
            onLoadingComplete={() => setLoaded(true)}
            {...props}
            alt=""
        />
    );
};

export default NextImage;

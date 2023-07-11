import styles from "./Links.module.sass";
import Icon from "@/components/Icon";

type LinksProps = {
    items?: any;
};

const Links = ({ items }: LinksProps) => {
    return(
    <div className={styles.links}>
        
            <a
                className={styles.link}
                href={items.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {/* <Icon name={item.icon} /> */}
                {items.link}
            </a>
       
    </div>
)};

export default Links;

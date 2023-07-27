import styles from "./Tags.module.sass";

type TagsProps = {
  tags: any;
};

const Tags = ({ tags }: TagsProps) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag: any, index: number) => (
        <div key={index} className="flex">
          {tag?.name.map((t: any, index: number) => (
            <div className={styles.tag} key={index} >
              {t}
            </div>
          ))}
        </ div>
      ))}
    </div>
  );
};

export default Tags;

import MyIcon from "../MyIcon";
import styles from "./Loader.module.css";

interface Props {
  fullScreen?: boolean;
  size?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 48 | 64 | 96 | 128 | 192 | 256;
}

function Loader({ fullScreen = false, size = 16 }: Props) {
  return (
    <div
      className={`
      ${styles.contLoader}
      ${fullScreen ? styles.fullScreen : ""}`}
    >
      <div className={styles.loader}>
        <MyIcon icon="FiLoader" size={size} />
      </div>
    </div>
  );
}

export default Loader;

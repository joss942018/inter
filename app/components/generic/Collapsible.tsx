import styles from "./Collapsible.module.css";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

function Collapsible({ children, title }: Props) {
  const [active, setActive] = useState(false);

  return (
    <div className={`${styles.contPrincipal}`}>
      <div
        className={`dark:bg-neutral-950 dark:hover:bg-medium_d ${
          styles.contTitulo
        } ${
          active
            ? "bg-gray-100 dark:bg-medium_d dark:text-slate-200 " +
              styles.opened
            : "bg-white"
        }`}
        onClick={() => setActive(!active)}
      >
        <h4 className={`dark:text-slate-100 ${styles.titulo}`}>{title}</h4>
        <div
          className={`ico-chevron-forward-outline ${styles.chevron} ${
            active ? styles.active : ""
          }`}
        />
      </div>
      <div
        className={`dark:bg-dark_d ${styles.contChildren} ${
          active ? styles.opened : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapsible;

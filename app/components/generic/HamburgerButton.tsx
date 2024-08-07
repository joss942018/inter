import styles from "./HamburgerButton.module.css";

interface Props {
  active: boolean;
  onClick: () => void;
}

function HamburgerButton({ active, onClick }: Props) {
  return (
    <button
      className={`${active ? styles.open : ""} ${styles["nav-icon-5"]}`}
      onClick={onClick}
    >
      <span className="bg-neutral-950 dark:bg-slate-300"></span>
      <span className="bg-neutral-950 dark:bg-slate-300"></span>
      <span className="bg-neutral-950 dark:bg-slate-300"></span>
    </button>
  );
}

export default HamburgerButton;

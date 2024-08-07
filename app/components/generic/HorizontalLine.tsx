import styles from "./HorizontalLine.module.css";

function HorizontalLine() {
  return (
    <div className="">
      <div className={`m-auto  ${styles["dot-elastic"]}`} />
    </div>
  );
}

export default HorizontalLine;

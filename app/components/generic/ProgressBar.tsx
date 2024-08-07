import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

interface Props {
  progress: number;
}

// progress prop in percentage
function ProgressBar({ progress }: Props) {
  const [progress0, setProgress0] = useState(0);

  useEffect(() => {
    if (progress < 0) setProgress0(0);
    else if (progress > 100) setProgress0(100);
    else setProgress0(progress);
  }, [progress]);

  return (
    <div className={`w-full h-my-12 bg-light dark:bg-medium_d`}>
      <div
        className={`bg-primary-800 dark:bg-primary-400 transition-all h-full`}
        // className={`bg-blue-600 transition-all h-full`}
        style={{ width: `${progress0}%` }}
      />
    </div>
  );
}

export default ProgressBar;

import styles from "./Paginador.module.css";
import { useEffect } from "react";

interface Props {
  pages: number[];
  selected: number;
  setSelected: (page: number) => void;
}

function Paginador({ pages, selected, setSelected }: Props) {
  const handlePrev = () => {
    if (selected > 0) {
      setSelected(selected - 1);
    }
  };

  const handleNext = () => {
    if (selected < pages.length - 1) {
      setSelected(selected + 1);
    }
  };

  useEffect(() => {
    if (pages.length <= selected && pages.length > 0) {
      setSelected(pages.length - 1);
    }
  }, [pages.length, selected]);

  return (
    <ul className={`${styles.contPages}`}>
      {pages.length > 1 && (
        <>
          <div
            className={`ico-chevron-back-outline ${styles.icoFlecha} ${
              selected <= 0 ? styles.disabled : ""
            }`}
            onClick={handlePrev}
          />

          {pages.map((el, i) => {
            return (
              <li
                className={`${
                  selected === el - 1 ? styles.active : ""
                } animar-hover ${
                  (i <= selected + 2 && i >= selected - 2) ||
                  (i < 5 && selected <= 2) ||
                  (selected >= pages.length - 2 && i >= pages.length - 5)
                    ? ""
                    : styles.hidden
                }`}
                key={i}
                onClick={() =>
                  (i <= selected + 2 && i >= selected - 2) ||
                  (i < 5 && selected <= 2) ||
                  (selected >= pages.length - 2 && i >= pages.length - 5)
                    ? setSelected(el - 1)
                    : () => {}
                }
              >
                {el}
              </li>
            );
          })}
          <div
            onClick={handleNext}
            className={`ico-chevron-forward-outline ${styles.icoFlecha} ${
              selected >= pages.length - 1 ? styles.disabled : ""
            }`}
          />
        </>
      )}
    </ul>
  );
}

export default Paginador;

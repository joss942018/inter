import { useContext } from "react";
import ConfirmContext from "../../context/ConfirmContext";
import styles from "./Tabs.module.css";

interface Props {
  lista: string[];
  selected: number;
  setSelected: (selected: number) => void;
  confirmarCambio?: boolean;
  mensajeConfirmacion?: string;
  nivel?: 1 | 2;
}

function Tabs({
  lista,
  selected,
  setSelected,
  confirmarCambio = false,
  mensajeConfirmacion,
  nivel = 1,
}: Props) {
  const { mostrarConfirm } = useContext(ConfirmContext);
  return (
    <ul className={`tabs`}>
      {lista.length > 1 &&
        lista.map((el, i) => {
          return (
            <li
              className={` ${
                selected === i ? "tab-active" : ""
              } tab tab-bordered`}
              key={Math.trunc(Math.random() * 10000000)}
              onClick={async () => {
                if (confirmarCambio) {
                  if (await mostrarConfirm(mensajeConfirmacion)) setSelected(i);
                } else {
                  setSelected(i);
                }
              }}
            >
              {el}
            </li>
          );
        })}
    </ul>
  );
}

export default Tabs;

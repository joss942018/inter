import { useContext, useEffect, useRef, useState } from "react";
import PopupContext from "../../context/PopupContext";
import "./Popup.css";

function Popup() {
  const [icono, setIcono] = useState("ico-advertencia");
  const [activo, setActivo] = useState(false);

  const { estado, setEstado } = useContext(PopupContext);

  const timeout = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (estado.activo) {
      setActivo(true);
      if (timeout.current != null) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setActivo(false);
      }, 4000);
      setEstado({
        ...estado,
        activo: false,
      });

      setIcono(() => {
        switch (estado.ico) {
          case 0:
            return "ico-error-color";
          case 1:
            return "ico-exito-color";
          case 2:
            return "ico-advertencia-color";
          default:
            return "ico-error";
        }
      });
    }
  }, [estado]);

  return (
    <div
      className={
        "popup " +
        (activo ? " mostrarpopup " : " ") +
        (estado.ico === 2 ? "amarillo" : estado.ico === 1 ? "verde" : "rojo")
      }
    >
      <div className={"icoPopup " + icono}></div>
      <div className="mensajePopup">{estado.mensaje}</div>
    </div>
  );
}

export default Popup;

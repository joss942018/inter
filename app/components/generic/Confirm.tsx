"use client";

import { useContext } from "react";
import ConfirmContext from "../../context/ConfirmContext";
import Modal from "./Modal";
import "./Confirm.css";
import MyButton from "../MyButton";

const Confirm = () => {
  const { estado, confirmar, cancelar } = useContext(ConfirmContext);

  return (
    <Modal active={estado.activo} close={cancelar} zIndex={120}>
      <div className={"cont-confirm"}>
        <h3 className="text-black dark:text-white text-center">
          {estado.mensaje}
        </h3>
        <div className="confirm-btns">
          <MyButton onClick={confirmar}>{estado.textoPositivo}</MyButton>
          <MyButton onClick={cancelar} hierarchy={2}>
            {estado.textoNegativo}
          </MyButton>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;

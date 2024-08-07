"use client";

import { createContext, useState } from "react";

interface IEstado {
  activo: boolean;
  mensaje: string;
  textoPositivo: string;
  textoNegativo: string;
}

interface IConfirmContext {
  estado: IEstado;
  mostrarConfirm: (
    mensaje?: string,
    textoPositivo?: string,
    textoNegativo?: string
  ) => Promise<unknown>;
  confirmar: () => void;
  cancelar: () => void;
}

const ConfirmContext = createContext({} as IConfirmContext);
let resolveCallback: (data: boolean) => void;

interface Props {
  children: React.ReactNode;
}

const ConfirmProvider = ({ children }: Props) => {
  let initialConfirm = {
    activo: false,
    mensaje: "¿Continuar?",
    textoPositivo: "Sí",
    textoNegativo: "No",
  };

  const [estado, setEstado] = useState(initialConfirm);

  const mostrarConfirm = (
    mensaje = "¿Continuar?",
    textoPositivo = "Sí",
    textoNegativo = "No"
  ) => {
    setEstado({
      activo: true,
      mensaje,
      textoPositivo,
      textoNegativo,
    });
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const cerrar = () => {
    setEstado(initialConfirm);
  };

  const confirmar = () => {
    cerrar();
    resolveCallback(true);
  };

  const cancelar = () => {
    cerrar();
    resolveCallback(false);
  };

  const data = { estado, mostrarConfirm, confirmar, cancelar };
  return (
    <ConfirmContext.Provider value={data}>{children}</ConfirmContext.Provider>
  );
};

export { ConfirmProvider };
export default ConfirmContext;

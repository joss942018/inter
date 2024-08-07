import { createContext, useCallback, useState } from "react";

interface IEstado {
  activo: boolean;
  mensaje: string;
  ico: number;
}

interface IPopupContext {
  estado: IEstado;
  mostrarPopup: (ico: number, mensaje: string) => void;
  setEstado: (estado: IEstado) => void;
}

const PopupContext = createContext({} as IPopupContext);

interface Props {
  children: React.ReactNode;
}

const PopupProvider = ({ children }: Props) => {
  let initialPopup = {
    activo: false,
    ico: 0,
    mensaje: "",
  };
  const [estado, setEstado] = useState(initialPopup);
  const mostrarPopup = useCallback((ico: number, mensaje: string) => {
    setEstado({
      activo: true,
      ico,
      mensaje,
    });
  }, []);

  const data = { estado, setEstado, mostrarPopup };
  return <PopupContext.Provider value={data}>{children}</PopupContext.Provider>;
};

export { PopupProvider };
export default PopupContext;

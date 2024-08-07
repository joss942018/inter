"use client";

import { createContext, useEffect, useState, useCallback } from "react";

export enum EnumViewMode {
  list = "list",
  grid = "grid",
}
interface IViewContext {
  view: EnumViewMode;
  setView: (view: EnumViewMode) => void;
  toggleView: () => void;
}

const ViewContext = createContext({} as IViewContext);

interface Props {
  children: React.ReactNode;
}

const ViewProvider = ({ children }: Props) => {
  const [view, setView] = useState<EnumViewMode>(EnumViewMode.list);

  useEffect(() => {
    const LSView = localStorage.getItem("view");
    if (LSView === "grid") {
      setView(EnumViewMode.grid);
    } else {
      setView(EnumViewMode.list);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  const toggleView = useCallback(() => {
    setView((v) =>
      v === EnumViewMode.list ? EnumViewMode.grid : EnumViewMode.list
    );
  }, []);

  return (
    <ViewContext.Provider value={{ view, setView, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export { ViewProvider };
export default ViewContext;

import { createContext, ReactNode, useContext, useState } from "react";
import React from "react";

export const TechContext = createContext<ITechContext>({} as ITechContext);

interface ITechContext {
  atual: string;
  setAtual: Function;
}

export interface IChildren {
  children: ReactNode;
}

export const TechProvider = ({ children }: IChildren) => {
  const [atual, setAtual] = useState<string>("");

  return (
    <TechContext.Provider value={{ atual, setAtual }}>
      {children}
    </TechContext.Provider>
  );
};

export const useTech = () => useContext(TechContext);

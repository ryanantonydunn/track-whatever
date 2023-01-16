import React from "react";
import { TStore } from "../types";
import pouchdb from "pouchdb";

export const db = {
  trackers: new pouchdb("trackers"),
  pages: new pouchdb("pages"),
  inputs: new pouchdb("inputs"),
};

export type TContext = {
  state: TStore;
  dispatch: React.Dispatch<TStore>;
};

type TProvider = { children: React.ReactNode };

export const StoreContext = React.createContext({} as TContext);

export const StoreProvider: React.FC<TProvider> = ({ children }) => {
  const [state, dispatch] = React.useState<TStore>({
    trackers: [],
    pages: [],
    inputs: [],
  });
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): TContext => {
  return React.useContext(StoreContext);
};

import React from "react";
import { TStore } from "../types";
import { TAction, reducer } from "./reducer";
import { runMigration } from "./migrations";

export type TContextProps = {
  state: TStore;
  dispatch: React.Dispatch<TAction>;
};

type TGetInitialState = () => TStore;

type TStoreProvider = { initialActions?: TAction[]; children: React.ReactNode };

// get data from local storage or default data
export const defaultData: TStore = {
  pages: [
    {
      id: "0",
      title: "My Trackers",
      items: [],
    },
  ],
  trackers: [
    {
      id: "0",
      title: "Mood",
      inputType: "slider",
      slider: {
        min: 0,
        max: 10,
        increment: 1,
      },
    },
    {
      id: "2",
      title: "Sugar",
      inputType: "checkbox",
    },
    {
      id: "3",
      title: "Alcohol",
      inputType: "number",
    },
    {
      id: "4",
      title: "Input",
      inputType: "text",
    },
  ],
  inputs: [],
};

export const getInitialState: TGetInitialState = () => {
  const data = localStorage.getItem("data");
  return data ? runMigration(JSON.parse(data)) : defaultData;
};

export const StoreContext = React.createContext({} as TContextProps);

export const StoreProvider: React.FC<TStoreProvider> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const value = { state, dispatch };

  // save to local storage
  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

type TStoreHook = {
  state: TStore;
  dispatch: React.Dispatch<TAction>;
};

export const useStore = (): TStoreHook => {
  return React.useContext(StoreContext);
};

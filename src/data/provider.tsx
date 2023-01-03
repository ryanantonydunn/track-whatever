import React from "react";
import { TStore } from "../types";
import { TAction, reducer } from "./reducer";

export type TContextProps = {
  state: TStore;
  dispatch: React.Dispatch<TAction>;
};

type TGetInitialState = () => TStore;

type TStoreProvider = { initialActions?: TAction[]; children: React.ReactNode };

export const getInitialState: TGetInitialState = () => ({
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
      inputType: "boolean",
    },
    {
      id: "3",
      title: "Alcohol",
      inputType: "boolean",
    },
  ],
  inputs: [],
});

export const StoreContext = React.createContext({} as TContextProps);

export const StoreProvider: React.FC<TStoreProvider> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const value = { state, dispatch };
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

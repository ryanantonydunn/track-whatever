import React from "react";
import { TStore } from "../types";
import { Actions, TAction, reducer } from "./reducer";
import { configGet } from "./actions/config-get";
import { pagesGet } from "./actions/pages-get";
import { trackersGet } from "./actions/trackers-get";
import { dbBase } from "./database";

export type TContext = {
  state: TStore;
  dispatch: React.Dispatch<TAction>;
};

type TProvider = { children: React.ReactNode };

export const StoreContext = React.createContext({} as TContext);

export const StoreProvider: React.FC<TProvider> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    trackers: [],
    pages: [],
    inputs: [],
    config: { _id: "", _rev: "", pageOrder: [] },
    loading: true,
  });

  // preload data
  React.useEffect(() => {
    async function preloadData() {
      let config = await configGet();
      if (!config) {
        await dbBase();
        config = await configGet();
      }
      if (!config) return;
      const pages = (await pagesGet()) || [];
      const trackers = (await trackersGet()) || [];
      dispatch({
        type: Actions.RESET_ALL_DATA,
        payload: { config, pages, trackers, inputs: [], loading: false },
      });
    }
    preloadData();
  }, []);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return React.useContext(StoreContext);
};

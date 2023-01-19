import React from "react";
import { TStore } from "../types";
import { trackersGet } from "./actions/trackers-get";
import { pagesGet } from "./actions/pages-get";
import { setupDB } from "./database";
import { Actions, TAction, reducer } from "./reducer";

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
    loading: true,
  });

  // load when starting up
  React.useEffect(() => {
    async function preloadData() {
      await setupDB();
      const trackers = await trackersGet();
      const pages = await pagesGet();
      if (trackers && pages) {
        dispatch({
          type: Actions.RESET_ALL_DATA,
          payload: { trackers, pages, inputs: [], loading: false },
        });
      }
    }
    preloadData();
  }, []);

  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): TContext => {
  return React.useContext(StoreContext);
};

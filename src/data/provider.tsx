import React from "react";
import { TStore } from "../types";
import { trackersGet } from "./actions/trackers-get";
import { pagesGet } from "./actions/pages-get";
import { setupDB } from "./database";

export type TContext = {
  state: TStore;
  dispatch: (newState: Partial<TStore>) => void;
};

type TProvider = { children: React.ReactNode };

export const StoreContext = React.createContext({} as TContext);

export const StoreProvider: React.FC<TProvider> = ({ children }) => {
  const [state, setState] = React.useState<TStore>({
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
        setState((state) => ({ ...state, trackers, pages, loading: false }));
      }
    }
    preloadData();
  }, []);

  // handle updates to state
  const dispatch = React.useCallback((newState: Partial<TStore>) => {
    setState((state) => {
      return { ...state, ...newState };
    });
  }, []);

  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): TContext => {
  return React.useContext(StoreContext);
};

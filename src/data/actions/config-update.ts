import { TConfig } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";

export async function configUpdate(
  config: TConfig
): Promise<TConfig | undefined> {
  try {
    const response = await db.config.put(config);
    if (response.ok) {
      const refetch = await db.config.get<TConfig>(config._id);
      return refetch;
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
}

export const useConfigUpdate = () => {
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (config: Partial<TConfig>) => {
      const newConfig = await configUpdate({ ...state.config, ...config });
      if (newConfig) {
        dispatch({ type: Actions.UPDATE_CONFIG, payload: newConfig });
      }
    },
    [state.config, dispatch]
  );
};

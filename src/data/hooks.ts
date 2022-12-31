import React from "react";
import { TGroup } from "../types";
import { useStore } from "./provider";
import { Actions } from "./reducer";

export const useGroups = (): TGroup[] => {
  const { state } = useStore();
  return state.groups;
};

type TUseGroup = [TGroup | undefined, (group: TGroup) => void];

export const useGroup = (id?: string): TUseGroup => {
  const { dispatch, state } = useStore();
  const group = React.useMemo(
    () => state.groups.find((d) => d.id === id),
    [id, state.groups]
  );
  const setGroup = React.useCallback(
    (newGroup: TGroup) => {
      dispatch({ type: Actions.UPDATE_GROUP, payload: newGroup });
    },
    [dispatch]
  );
  return [group, setGroup];
};

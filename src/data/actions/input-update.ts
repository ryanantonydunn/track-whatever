import { TInput } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";

export async function inputUpdate(input: TInput): Promise<TInput | undefined> {
  try {
    const response = await db.inputs.put(input);
    if (response.ok) {
      const refetch = await db.inputs.get<TInput>(input._id);
      return refetch;
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
}

export const useInputUpdate = () => {
  const { dispatch } = useStore();
  return React.useCallback(
    async (input: TInput) => {
      const updatedInput = await inputUpdate(input);
      if (updatedInput) {
        dispatch({ type: Actions.UPDATE_INPUT, payload: updatedInput });
      }
    },
    [dispatch]
  );
};

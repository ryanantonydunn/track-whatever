import { TInput } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";

export async function inputCreate(
  newInput: TInput
): Promise<TInput | undefined> {
  try {
    const response = await db.inputs.put(newInput);
    if (response.ok) {
      const refetch = await db.inputs.get<TInput>(newInput._id);
      return refetch;
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
}

export const useInputCreate = () => {
  const { dispatch } = useStore();
  return React.useCallback(
    async (input: TInput) => {
      const newInput = await inputCreate(input);
      if (newInput) {
        dispatch({ type: Actions.CREATE_INPUT, payload: newInput });
      }
    },
    [dispatch]
  );
};

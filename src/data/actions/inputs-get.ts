import React from "react";
import { TInput } from "../../types";
import { db } from "../database";
import { useStore } from "../provider";
import { Actions } from "../reducer";

type TInputsGetArgs = {
  limit?: number;
  skip?: number;
  dateFrom?: Date;
  dateTo?: Date;
  trackerIds?: string[];
};

type TQuery = {
  selector: {
    date?: {
      $gte: string;
      $lt: string;
    };
    $or?: { trackerId: string }[];
  };
  limit?: number;
  skip?: number;
};

export async function inputsGet(
  args: TInputsGetArgs
): Promise<TInput[] | undefined> {
  try {
    const query: TQuery = {
      selector: {},
    };
    if (args.dateFrom || args.dateTo) {
      query.selector.date = {
        $gte: (args.dateFrom || new Date(0)).toISOString(),
        $lt: (args.dateTo || new Date()).toISOString(),
      };
    }
    if (args.trackerIds) {
      query.selector.$or = args.trackerIds.map((id) => ({ trackerId: id }));
    }
    if (args.limit !== undefined) query.limit = args.limit;
    if (args.skip !== undefined) query.skip = args.skip;

    const response = await db.inputs.find(query);
    if (response?.docs) {
      return response.docs as TInput[];
    }
  } catch (err) {
    console.error(err);
  }
}

type TUseInputs = {
  loading: boolean;
  load: (args: TInputsGetArgs) => void;
};

export const useLoadInputs = (): TUseInputs => {
  const { dispatch } = useStore();
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(
    async (args: TInputsGetArgs) => {
      setLoading(true);
      dispatch({ type: Actions.SET_INPUTS, payload: [] });
      const inputs = await inputsGet(args);
      if (inputs) {
        dispatch({ type: Actions.SET_INPUTS, payload: inputs });
      }
      setLoading(false);
    },
    [dispatch]
  );

  return { loading, load };
};

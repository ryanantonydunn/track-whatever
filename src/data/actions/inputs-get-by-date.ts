import React from "react";
import { TInput } from "../../types";
import { db } from "../database";
import { useStore } from "../provider";
import { Actions } from "../reducer";

type TQuery = {
  selector: {
    date?: {
      $gte: string;
      $lt: string;
    };
    trackerId?: { $in: string[] };
  };
  sort?: { [propName: string]: "desc" | "asc" }[];
};

type TQueryArgs = {
  dateFrom?: Date;
  dateTo?: Date;
  trackerIds?: string[];
};

export async function inputsGetByDate(
  args: TQueryArgs
): Promise<TInput[] | undefined> {
  try {
    const query: TQuery = {
      selector: {},
      sort: [{ date: "desc" }],
    };
    if (args.dateFrom || args.dateTo) {
      query.selector.date = {
        $gte: (args.dateFrom || new Date(0)).toISOString(),
        $lt: (args.dateTo || new Date()).toISOString(),
      };
    }
    if (args.trackerIds) {
      query.selector.trackerId = {
        $in: args.trackerIds,
      };
    }

    const response = await db.inputs.find(query);
    if (response?.docs) {
      return response.docs as TInput[];
    }
  } catch (err) {
    console.error(err);
  }
}

type THook = {
  loading: boolean;
  load: (args: TQueryArgs) => void;
};

export const useInputsGetByDate = (): THook => {
  const { dispatch } = useStore();
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(
    async (args: TQueryArgs) => {
      setLoading(true);
      dispatch({ type: Actions.SET_INPUTS, payload: [] });
      const inputs = await inputsGetByDate(args);
      if (inputs) {
        dispatch({ type: Actions.SET_INPUTS, payload: inputs });
      }
      setLoading(false);
    },
    [dispatch]
  );

  return { loading, load };
};

/**
 * Function to run on an old version of data and update it with any changes
 * Eg: If stored data is from a version before pages were added, it adds them
 */

import { TStore } from "../types";
import { createBlankPage } from "../utils/create-blank-data";

export function runMigration(state: TStore): TStore {
  // check if we have pages
  if (!state.pages) {
    state.pages = [createBlankPage()];
  }
  return state;
}

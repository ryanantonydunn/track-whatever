import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { createBlankTracker } from "../../data/helpers";
import { TTracker } from "../../types";
import { TrackerAddEditForm } from "./TrackerAddEditForm";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";

type TSaveArgs = {
  onSave: (newTracker: TTracker) => void;
};

type TTrackerAdd = {
  open: (args: TSaveArgs) => void;
  component: React.ReactNode;
};

export function useTrackerAdd(): TTrackerAdd {
  const { dispatch } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TSaveArgs | undefined>();

  const open = (args: TSaveArgs) => {
    setIsOpen(true);
    setArgs(args);
  };

  const [tracker, setTracker] = React.useState(createBlankTracker());

  const component = (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="tracker-add-title"
    >
      <DialogTitle id="confirm-dialog-title">Add a new tracker</DialogTitle>
      <DialogContent>
        <TrackerAddEditForm tracker={tracker} setTracker={setTracker} />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: Actions.CREATE_TRACKER, payload: tracker });
            args?.onSave?.(tracker);
            setIsOpen(false);
            setTracker(createBlankTracker());
          }}
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { open, component };
}

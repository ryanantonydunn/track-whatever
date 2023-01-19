import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { TTracker } from "../../types";
import { TrackerAddEditForm } from "./TrackerAddEditForm";
import { createBlankTracker } from "../../utils/create-blank-data";
import { useTrackerCreate } from "../../data/actions/tracker-create";

type TOpenArgs = {
  onSave?: (newTracker: TTracker) => void;
};

type TTrackerAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function useTrackerAdd(): TTrackerAdd {
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const trackerCreate = useTrackerCreate();
  const [tracker, setTracker] = React.useState(createBlankTracker());

  const open = (args?: TOpenArgs) => {
    setIsOpen(true);
    setArgs(args);
  };

  const save = async () => {
    await trackerCreate(tracker);
    args?.onSave?.(tracker);
    setIsOpen(false);
    setTracker(createBlankTracker());
  };

  const component = (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="tracker-add-title"
    >
      <DialogTitle id="tracker-add-title">Add a new tracker</DialogTitle>
      <DialogContent>
        <TrackerAddEditForm tracker={tracker} setTracker={setTracker} />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button onClick={save} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { open, component };
}

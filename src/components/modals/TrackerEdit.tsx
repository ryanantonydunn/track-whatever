import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useGetTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { TTracker } from "../../types";
import { TrackerAddEditForm } from "./TrackerAddEditForm";

type TOpenArgs = {
  trackerId: string;
  onSave?: (newTracker: TTracker) => void;
};

type TTrackerAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function useTrackerEdit(): TTrackerAdd {
  const { dispatch } = useStore();
  const getTracker = useGetTracker();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const [tracker, setTracker] = React.useState<TTracker | undefined>();

  const open = (args?: TOpenArgs) => {
    const editingTracker = getTracker(args?.trackerId);
    if (editingTracker) {
      setTracker({ ...editingTracker });
      setArgs(args);
      setIsOpen(true);
    }
  };

  const component = tracker ? (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="tracker-edit-title"
    >
      <DialogTitle id="tracker-edit-title">Edit tracker</DialogTitle>
      <DialogContent>
        <TrackerAddEditForm
          tracker={tracker}
          setTracker={setTracker}
          isEditing
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => {
            setIsOpen(false);
            setTracker(undefined);
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: Actions.UPDATE_TRACKER, payload: tracker });
            setTracker(undefined);
            args?.onSave?.(tracker);
            setIsOpen(false);
          }}
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;

  return { open, component };
}

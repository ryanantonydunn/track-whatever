import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useTrackerUpdate } from "../../data/actions/tracker-update";
import { useGetTracker } from "../../data/hooks";
import { TSliderValues, TTracker, inputTypes } from "../../types";
import { SliderEdit } from "../base/SliderEdit";

type TOpenArgs = {
  trackerId: string;
  onSave?: (newTracker: TTracker) => void;
};

type TTrackerAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function useTrackerEdit(): TTrackerAdd {
  const getTracker = useGetTracker();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const [tracker, setTracker] = React.useState<TTracker | undefined>();
  const trackerUpdate = useTrackerUpdate();

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
        <Box sx={{ p: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Title"
            value={tracker.title}
            onChange={(e) => {
              setTracker({
                ...tracker,
                title: e.currentTarget.value.slice(0, 100),
              });
            }}
          />
          <Typography sx={{ pt: 3 }}>
            Type:{" "}
            <b>{inputTypes.find((d) => d._id === tracker.inputType)?.title}</b>
          </Typography>

          {tracker.inputType === "slider" && (
            <SliderEdit
              values={tracker.slider}
              setValues={(slider: TSliderValues) => {
                setTracker({ ...tracker, slider });
              }}
            />
          )}
        </Box>
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
            trackerUpdate(tracker);
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

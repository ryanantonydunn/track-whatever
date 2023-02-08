import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useTrackerCreate } from "../../data/actions/tracker-create";
import { TInputKey, TSliderValues, TTracker, inputTypes } from "../../types";
import { createBlankTracker } from "../../utils/create-blank-data";
import { SliderEdit } from "../base/SliderEdit";
import { useStore } from "../../data/provider";
import { usePageUpdate } from "../../data/actions/page-update";

type TOpenArgs = {
  onSave?: (newTracker: TTracker) => void;
  pageId?: string;
};

type TTrackerAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function useTrackerAdd(): TTrackerAdd {
  const { state } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const trackerCreate = useTrackerCreate();
  const pageUpdate = usePageUpdate();
  const [tracker, setTracker] = React.useState(createBlankTracker());
  const [pageId, setPageId] = React.useState(state.pages[0]?._id);

  const open = (args?: TOpenArgs) => {
    setIsOpen(true);
    if (args?.pageId) {
      setPageId(args.pageId);
    }
    setArgs(args);
  };

  const save = async () => {
    // create the tracker
    await trackerCreate(tracker);

    // add it to a page
    if (pageId) {
      const page = state.pages.find((p) => p._id === pageId);
      if (page) {
        await pageUpdate({
          ...page,
          items: [...page.items, { _id: tracker._id, type: "tracker" }],
        });
      }
    }

    // finish the process
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
          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="input-type-label">Input Type</InputLabel>
            <Select
              labelId="input-type-label"
              id="input-type"
              value={tracker.inputType}
              label="Input Type"
              onChange={(e) => {
                setTracker({
                  ...tracker,
                  inputType: e.target.value as TInputKey,
                });
              }}
            >
              {inputTypes.map((inputType) => (
                <MenuItem key={inputType._id} value={inputType._id}>
                  {inputType.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {tracker.inputType === "slider" && (
            <SliderEdit
              values={tracker.slider}
              setValues={(slider: TSliderValues) => {
                setTracker({ ...tracker, slider });
              }}
            />
          )}

          {state.pages.length > 1 ? (
            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel id="page-label">Add to Page</InputLabel>
              <Select
                labelId="page-label"
                id="page"
                value={pageId}
                label="Add to Page"
                onChange={(e) => {
                  setPageId(e.target.value);
                }}
              >
                <MenuItem value="">No Page</MenuItem>
                {state.pages.map((page) => (
                  <MenuItem key={page._id} value={page._id}>
                    {page.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Box>
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

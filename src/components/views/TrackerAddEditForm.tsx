import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { TInputKey, TTracker, inputKeys } from "../../types";

type TTrackerAddEditForm = {
  tracker: TTracker;
  setTracker: (tracker: TTracker) => void;
};

export const TrackerAddEditForm: React.FC<TTrackerAddEditForm> = ({
  tracker,
  setTracker,
}) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={tracker.title}
          error={!tracker.title}
          helperText={!tracker.title ? "Please enter a title" : ""}
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
            {inputKeys.map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

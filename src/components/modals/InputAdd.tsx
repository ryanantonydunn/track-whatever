import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { TInput, TInputPrimitive } from "../../types";
import { createBlankInput } from "../../utils/create-blank-data";
import { InputEntry } from "../base/InputEntry";
import { useInputCreate } from "../../data/actions/input-create";

type TOpenArgs = {
  trackerId: string;
  onSave?: (newInput: TInput) => void;
};

type TInputAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function useInputAdd(): TInputAdd {
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const [value, setValue] = React.useState<TInputPrimitive | undefined>();
  const [date, setDate] = React.useState(new Date());
  const inputCreate = useInputCreate();

  const open = (args?: TOpenArgs) => {
    setArgs(args);
    setIsOpen(true);
  };

  const component = (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="input-add-title"
    >
      <DialogTitle id="input-add-title">Add input</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Set time"
            value={date}
            onChange={(newValue) => {
              setDate(newValue || new Date());
            }}
          />
          {args?.trackerId && (
            <Box sx={{ mt: 2 }}>
              <InputEntry
                trackerId={args.trackerId}
                value={value}
                setValue={(trackerId, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => {
            setIsOpen(false);
            setValue(undefined);
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (args?.trackerId && value !== undefined) {
              const newInput = {
                ...createBlankInput(),
                date: date.toISOString(),
                trackerId: args.trackerId,
                value,
              };
              inputCreate(newInput);
              setValue(undefined);
              args?.onSave?.(newInput);
              setIsOpen(false);
            }
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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useGetInput } from "../../data/hooks";
import { TInput } from "../../types";
import { InputEntry } from "../base/InputEntry";
import { Box } from "@mui/system";
import { useInputDelete } from "../../data/actions/input-delete";
import { useInputUpdate } from "../../data/actions/input-update";
import { DateTimePicker } from "@mui/x-date-pickers";

type TOpenArgs = {
  inputId: string;
  onSave?: (newInput: TInput) => void;
};

type TInputEdit = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function useInputEdit(): TInputEdit {
  const getInput = useGetInput();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const [input, setInput] = React.useState<TInput | undefined>();
  const [isRemoving, setIsRemoving] = React.useState(false);
  const inputDelete = useInputDelete();
  const inputUpdate = useInputUpdate();

  const open = (args?: TOpenArgs) => {
    const editingInput = getInput(args?.inputId);
    if (editingInput) {
      setInput({ ...editingInput });
      setArgs(args);
      setIsOpen(true);
    }
  };

  const component = input ? (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="input-edit-title"
    >
      <DialogTitle id="input-edit-title">Edit input</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Set time"
            value={new Date(input.date)}
            onChange={(newValue) => {
              setInput({
                ...input,
                date: (newValue || new Date()).toISOString(),
              });
            }}
          />
          <Box sx={{ mt: 2 }}>
            <InputEntry
              trackerId={input.trackerId}
              value={isRemoving ? undefined : input.value}
              setValue={(trackerId, newValue) => {
                if (newValue === undefined) {
                  setIsRemoving(true);
                } else {
                  setIsRemoving(false);
                  setInput({ ...input, value: newValue });
                }
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => {
            setIsOpen(false);
            setInput(undefined);
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (isRemoving) {
              inputDelete(input);
            } else {
              inputUpdate(input);
            }
            setInput(undefined);
            setIsRemoving(false);
            args?.onSave?.(input);
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

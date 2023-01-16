import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useGetInput } from "../../data/hooks";
import { TInput } from "../../types";
import { InputEntry } from "../base/InputEntry";
import { Box } from "@mui/system";

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
              // dispatch({ type: Actions.DELETE_INPUT, payload: input.id });
            } else {
              // dispatch({ type: Actions.UPDATE_INPUT, payload: input });
              // TODO
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

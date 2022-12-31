import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type TConfirmArgs = {
  onConfirm: () => void;
  title: string;
  description: string;
};

type TConfirmDialog = {
  open: (args: TConfirmArgs) => void;
  component: React.ReactNode;
};

export function useConfirmDialog(): TConfirmDialog {
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TConfirmArgs | undefined>();

  const open = (args: TConfirmArgs) => {
    setIsOpen(true);
    setArgs(args);
  };

  const component = (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{args?.title || ""}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {args?.description || ""}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            args?.onConfirm?.();
            setIsOpen(false);
          }}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { open, component };
}

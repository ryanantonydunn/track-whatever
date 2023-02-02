import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../data/provider";

type TPageChoose = {
  open: () => void;
  component: React.ReactNode;
};

export function usePageChoose(): TPageChoose {
  const { state } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const component = (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="page-choose-title"
    >
      <DialogTitle id="page-choose-title">Choose Page</DialogTitle>
      <DialogContent>
        <List sx={{ mt: 2 }}>
          {state.pages.map((page) => (
            <ListItem key={page._id} disablePadding>
              <ListItemButton component={Link} to={`/entry/${page._id}`}>
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );

  return { open, component };
}

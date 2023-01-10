import { TrendingUp } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { TPage, TPageItemType } from "../../types";
import { TrackerMenuList } from "../base/TrackerMenuList";
import { useTrackerAdd } from "./TrackerAdd";

type TOpenArgs = {
  page: TPage;
};

type TPageItemAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function usePageItemAdd(): TPageItemAdd {
  const { dispatch } = useStore();
  const trackerAdd = useTrackerAdd();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const [menu, setMenu] = React.useState<"type" | "existingTracker">("type");

  const close = () => {
    setMenu("type");
    setIsOpen(false);
    setArgs(undefined);
  };

  const open = (args?: TOpenArgs) => {
    setIsOpen(true);
    setArgs(args);
  };

  const save = React.useCallback(
    (type: TPageItemType, id?: string) => {
      if (!args?.page) return;
      dispatch({
        type: Actions.UPDATE_PAGE,
        payload: { ...args.page, items: [...args.page.items, { id, type }] },
      });
      close();
    },
    [args, dispatch]
  );

  const component = (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          close();
        }}
        aria-labelledby="page-add-title"
      >
        <DialogTitle id="page-add-title">Add a new page item</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {menu === "type" && (
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    trackerAdd.open({
                      onSave: (newTracker) => {
                        save("tracker", newTracker.id);
                      },
                    });
                  }}
                >
                  <ListItemIcon>
                    <TrendingUp />
                  </ListItemIcon>
                  <ListItemText primary="New Tracker" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setMenu("existingTracker")}>
                  <ListItemIcon>
                    <TrendingUp />
                  </ListItemIcon>
                  <ListItemText primary="Existing Tracker" />
                </ListItemButton>
              </ListItem>
            </List>
          )}
          {menu === "existingTracker" && (
            <TrackerMenuList
              onClick={(tracker) => {
                save("tracker", tracker.id);
              }}
              disableIds={(args?.page.items || [])
                .filter((item) => item.type === "tracker")
                .map((item) => item.id || "")}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              close();
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {trackerAdd.component}
    </>
  );

  return { open, component };
}

import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useStore } from "../../data/provider";
import { TTracker } from "../../types";

type TTrackerList = {
  onClick: (tracker: TTracker) => void;
  disableIds?: string[];
};

export const TrackerMenuList: React.FC<TTrackerList> = ({
  onClick,
  disableIds = [],
}) => {
  const { state } = useStore();

  return (
    <List>
      {state.trackers.length ? (
        state.trackers.map((tracker) => (
          <ListItem disablePadding key={tracker.id}>
            <ListItemButton
              onClick={() => {
                onClick(tracker);
              }}
              disabled={disableIds.includes(tracker.id)}
            >
              <ListItemText primary={tracker.title} />
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <ListItem disablePadding>
          <ListItemText primary="No trackers to display" />
        </ListItem>
      )}
    </List>
  );
};

import { ArrowDownward, ArrowUpward, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { TGroup } from "../../types";

type TGroupAddEditForm = {
  group: TGroup;
  setGroup: (group: TGroup) => void;
};

export const GroupAddEditForm: React.FC<TGroupAddEditForm> = ({
  group,
  setGroup,
}) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={group.title}
          error={!group.title}
          helperText={!group.title ? "Please enter a title" : ""}
          onChange={(e) => {
            setGroup({ ...group, title: e.currentTarget.value.slice(0, 100) });
          }}
        />
      </Box>
      <Typography variant="h6" component="h3" sx={{ p: 2 }}>
        Trackers
      </Typography>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <List>
          {group.trackers.length ? (
            group.trackers.map((trackerId) => {
              return (
                <ListItem disablePadding key={trackerId}>
                  <ListItemText sx={{ p: 1, pl: 3 }}>{trackerId}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      size="medium"
                      aria-label="move up"
                      // onClick={() => {}}
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="move down"
                      // onClick={() => {}}
                    >
                      <ArrowDownward />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="edit tracker"
                      href={`/edit-tracker/${trackerId}`}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="delete tracker"
                      onClick={() => {}}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <Typography align="center" sx={{ p: 2 }}>
              No trackers yet, add one below
            </Typography>
          )}
        </List>
      </Box>
      <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            console.log("yeah");
          }}
          sx={{ mr: 1 }}
        >
          Add Existing Tracker
        </Button>
        <Button variant="contained" size="small" href="/add-tracker">
          Add New Tracker
        </Button>
      </Box>
    </>
  );
};

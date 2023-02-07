import { Add, MoreVert } from "@mui/icons-material";
import {
  Box,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTrackerDelete } from "../../data/actions/tracker-delete";
import { useStore } from "../../data/provider";
import { TTracker } from "../../types";
import { primaryGradient } from "../../utils/gradient";
import { Layout } from "../base/Layout";
import { useConfirmDialog } from "../modals/ConfirmDialog";
import { useTrackerAdd } from "../modals/TrackerAdd";
import { useTrackerEdit } from "../modals/TrackerEdit";

export const TrackerList: React.FC = () => {
  const confirmDialog = useConfirmDialog();
  const trackerEdit = useTrackerEdit();
  const trackerAdd = useTrackerAdd();
  const trackerDelete = useTrackerDelete();

  const { state } = useStore();

  const [menuEl, setMenuEl] = React.useState<undefined | HTMLElement>();
  const [menuItem, setMenuItem] = React.useState<undefined | TTracker>();
  const closeMenu = () => setMenuEl(undefined);
  return (
    <Layout title="Manage Trackers" back="/">
      {state.trackers.length ? (
        state.trackers.map((tracker) => (
          <Stack
            key={tracker._id}
            direction="row"
            alignItems="center"
            sx={{ borderBottom: `1px solid rgba(224, 224, 224, 1);` }}
          >
            <Typography
              component={Link}
              to={`/tracker/${tracker._id}`}
              sx={{
                p: 1,
                pl: 3,
                flex: 1,
                color: "black",
                textDecoration: "none",
              }}
            >
              {tracker.title}
            </Typography>
            <Box sx={{ p: 1 }}>
              <IconButton
                size="small"
                aria-label="actions"
                onClick={(e) => {
                  setMenuEl(e.currentTarget);
                  setMenuItem(tracker);
                }}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
          </Stack>
        ))
      ) : (
        <Typography align="center" sx={{ p: 2 }}>
          No trackers to edit
        </Typography>
      )}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 14,
          right: 14,
          background: primaryGradient,
        }}
        onClick={() => {
          trackerAdd.open();
        }}
        aria-label="add new tracker"
      >
        <Add />
      </Fab>
      <Menu anchorEl={menuEl} open={!!menuEl} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu();
            trackerEdit.open({ trackerId: menuItem?._id || "" });
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            confirmDialog.open({
              title: "Confirm delete tracker",
              description:
                "Are you sure you want to remove this tracker, this will remove all associated input data.",
              onConfirm: () => {
                if (menuItem) trackerDelete(menuItem);
              },
            });
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {trackerEdit.component}
      {trackerAdd.component}
      {confirmDialog.component}
    </Layout>
  );
};

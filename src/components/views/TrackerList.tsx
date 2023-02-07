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

  // tracker menu
  const [menuElTracker, setMenuElTracker] = React.useState<
    undefined | HTMLElement
  >();
  const [menuItemTracker, setMenuItemTracker] = React.useState<
    undefined | TTracker
  >();
  const closeMenuTracker = () => setMenuElTracker(undefined);
  return (
    <Layout title="Manage Trackers" back="/">
      <Box sx={{ pt: 1 }} />
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
                  setMenuElTracker(e.currentTarget);
                  setMenuItemTracker(tracker);
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
      <Menu
        anchorEl={menuElTracker}
        open={!!menuElTracker}
        onClose={closeMenuTracker}
      >
        <MenuItem
          onClick={() => {
            closeMenuTracker();
            trackerEdit.open({ trackerId: menuItemTracker?._id || "" });
          }}
        >
          Edit Tracker
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenuTracker();
            confirmDialog.open({
              title: "Confirm delete tracker",
              description:
                "Are you sure you want to remove this tracker, this will remove all associated input data.",
              onConfirm: () => {
                if (menuItemTracker) trackerDelete(menuItemTracker);
              },
            });
          }}
        >
          Delete Tracker
        </MenuItem>
      </Menu>
      {trackerEdit.component}
      {trackerAdd.component}
      {confirmDialog.component}
    </Layout>
  );
};

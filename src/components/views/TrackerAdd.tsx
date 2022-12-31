import { Box, Button, Container, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createBlankTracker } from "../../data/helpers";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { TTracker } from "../../types";
import { Layout } from "../base/Layout";
import { TrackerAddEditForm } from "./TrackerAddEditForm";

export const TrackerAdd: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const tracker = state.create.tracker;

  const setTracker = React.useCallback(
    (newTracker: TTracker) => {
      dispatch({ type: Actions.UPDATE_CREATE_TRACKER, payload: newTracker });
    },
    [dispatch]
  );

  return (
    <Layout title="Add Tracker">
      <Container maxWidth="sm">
        <TrackerAddEditForm tracker={tracker} setTracker={setTracker} />
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box display="flex" sx={{ p: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setTracker(createBlankTracker());
              navigate("/");
            }}
            sx={{ flexGrow: 1, mr: 2 }}
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch({
                type: Actions.CREATE_TRACKER,
                payload: tracker,
              });
              setTracker(createBlankTracker());
              navigate("/");
            }}
            sx={{ flexGrow: 1 }}
            size="large"
          >
            Save New Tracker
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

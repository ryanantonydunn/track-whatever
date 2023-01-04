import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { TInput, TInputPrimitive } from "../../types";
import { Layout } from "../base/Layout";
import { TrackInput } from "../base/TrackInput";
import { useTrackerAdd } from "../modals/TrackerAdd";
import { createBlankInput } from "../../utils/create-blank-data";

type TParams = {
  pageId: string;
};

type TInputs = { [key: string]: TInput }; // { trackerId: { ...input } }

export const PageView: React.FC = () => {
  const { pageId } = useParams<TParams>();
  const page = { title: "New Page" };
  const { state, dispatch } = useStore();
  const trackerAdd = useTrackerAdd();
  const [inputs, setInputs] = React.useState<TInputs>({});

  // handle input changes
  const setValue = (trackerId: string, value: TInputPrimitive) => {
    if (inputs[trackerId]) {
      if (value === "" || value === undefined) {
        // remove a set input that has been changed to empty
        const newInputs = { ...inputs };
        delete newInputs[trackerId];
        setInputs({ ...newInputs });
        dispatch({ type: Actions.DELETE_INPUT, payload: inputs[trackerId].id });
      } else {
        // replace a set input value
        const newInput = { ...inputs[trackerId], value };
        setInputs({ ...inputs, [trackerId]: newInput });
        dispatch({ type: Actions.UPDATE_INPUT, payload: newInput });
      }
    } else {
      // make new input value
      const newInput = { ...createBlankInput(), trackerId, value };
      setInputs({ ...inputs, [trackerId]: newInput });
      dispatch({ type: Actions.CREATE_INPUT, payload: newInput });
    }
  };

  return (
    <Layout title={page.title}>
      <Container maxWidth="sm">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List>
            {state.trackers.length ? (
              state.trackers.map((tracker) => {
                // const tracker = getTracker(trackerId);
                // if (!tracker) return null;
                return (
                  <ListItem key={tracker.id}>
                    <TrackInput
                      trackerId={tracker.id}
                      value={inputs[tracker.id]?.value || undefined}
                      setValue={setValue}
                    />
                  </ListItem>
                );
              })
            ) : (
              <Typography align="center" sx={{ p: 2 }}>
                No trackers yet, add a new one below
              </Typography>
            )}
          </List>
        </Box>
        <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              trackerAdd.open({
                onSave: (newTracker) => {
                  console.log(newTracker, "TODO add to end of page later");
                },
              });
            }}
          >
            Add New Tracker
          </Button>
        </Box>
      </Container>
      {trackerAdd.component}
    </Layout>
  );
};

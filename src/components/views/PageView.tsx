import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetTracker, usePage } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { TInput, TInputPrimitive } from "../../types";
import { createBlankInput } from "../../utils/create-blank-data";
import { InputEntry } from "../base/InputEntry";
import { Layout } from "../base/Layout";
import { usePageItemAdd } from "../modals/PageItemAdd";

type TParams = {
  pageId: string;
};

type TInputs = { [key: string]: TInput }; // { trackerId: { ...input } }

export const PageView: React.FC = () => {
  const { pageId } = useParams<TParams>();
  const page = usePage(pageId);
  const getTracker = useGetTracker();
  const { dispatch } = useStore();
  const pageItemAdd = usePageItemAdd();
  const [inputs, setInputs] = React.useState<TInputs>({});
  const [inputTime, setInputTime] = React.useState(new Date());

  // handle input changes
  const setValue = (trackerId: string, value: TInputPrimitive | undefined) => {
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
      if (value !== undefined) {
        // make new input value
        const newInput = {
          ...createBlankInput(),
          date: inputTime.toISOString(),
          trackerId,
          value,
        };
        setInputs({ ...inputs, [trackerId]: newInput });
        dispatch({ type: Actions.CREATE_INPUT, payload: newInput });
      }
    }
  };

  if (!page) return null;

  return (
    <Layout title={page.title}>
      <Container maxWidth="md">
        <Box sx={{ p: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Set time"
            value={inputTime}
            onChange={(newValue) => {
              setInputTime(newValue || new Date());
            }}
          />
        </Box>
        <Paper>
          <List>
            {page.items.length ? (
              page.items.map((item) => {
                if (item.type === "tracker") {
                  const tracker = getTracker(item.id);
                  if (!tracker) return null;
                  return (
                    <ListItem key={tracker.id}>
                      <InputEntry
                        trackerId={tracker.id}
                        value={inputs[tracker.id]?.value || undefined}
                        setValue={setValue}
                      />
                    </ListItem>
                  );
                }
                return null;
              })
            ) : (
              <Typography align="center" sx={{ p: 2 }}>
                No items added yet, add a new one below
              </Typography>
            )}
          </List>
        </Paper>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          sx={{ p: 2 }}
        >
          <Button
            variant="text"
            size="small"
            component={Link}
            to={`/edit-page/${page.id}`}
            sx={{ mr: 2 }}
          >
            Edit This Page
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              pageItemAdd.open({ page });
            }}
          >
            Add New Item
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          sx={{ p: 2 }}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            component={Link}
            to={`/`}
          >
            Done
          </Button>
        </Box>
      </Container>
      {pageItemAdd.component}
    </Layout>
  );
};

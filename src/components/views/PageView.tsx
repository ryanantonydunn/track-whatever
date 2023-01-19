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
import { TInput, TInputPrimitive } from "../../types";
import { createBlankInput } from "../../utils/create-blank-data";
import { InputEntry } from "../base/InputEntry";
import { Layout } from "../base/Layout";
import { usePageItemAdd } from "../modals/PageItemAdd";
import { useInputDelete } from "../../data/actions/input-delete";
import { useInputUpdate } from "../../data/actions/input-update";
import { useInputCreate } from "../../data/actions/input-create";

type TParams = {
  pageId: string;
};

type TInputs = { [key: string]: TInput }; // { trackerId: { ...input } }

export const PageView: React.FC = () => {
  const { pageId } = useParams<TParams>();
  const page = usePage(pageId);
  const getTracker = useGetTracker();
  const pageItemAdd = usePageItemAdd();
  const [inputs, setInputs] = React.useState<TInputs>({});
  const [inputTime, setInputTime] = React.useState(new Date());
  const inputDelete = useInputDelete();
  const inputUpdate = useInputUpdate();
  const inputCreate = useInputCreate();

  // handle input changes
  const setValue = (trackerId: string, value: TInputPrimitive | undefined) => {
    if (inputs[trackerId]) {
      if (value === "" || value === undefined) {
        // remove a set input that has been changed to empty
        const newInputs = { ...inputs };
        delete newInputs[trackerId];
        setInputs({ ...newInputs });
        inputDelete(inputs[trackerId]);
      } else {
        // replace a set input value
        const newInput = { ...inputs[trackerId], value };
        setInputs({ ...inputs, [trackerId]: newInput });
        inputUpdate(newInput);
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
        inputCreate(newInput);
      }
    }
  };

  if (!page) return null;

  return (
    <Layout title={page.title} back="/">
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
                  const tracker = getTracker(item._id);
                  if (!tracker) return null;
                  return (
                    <ListItem key={tracker._id}>
                      <InputEntry
                        trackerId={tracker._id}
                        value={inputs[tracker._id]?.value}
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
            to={`/edit-page/${page._id}`}
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

import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useInputCreate } from "../../data/actions/input-create";
import { useInputDelete } from "../../data/actions/input-delete";
import { useInputUpdate } from "../../data/actions/input-update";
import { useGetTracker, usePage } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { TInputPrimitive } from "../../types";
import { createBlankInput } from "../../utils/create-blank-data";
import { InputEntry } from "../base/InputEntry";
import { Layout } from "../base/Layout";
import { usePageItemAdd } from "../modals/PageItemAdd";

type TParams = {
  pageId: string;
};

type TInputs = { [key: string]: string }; // { trackerId: inputId }

export const DataEntry: React.FC = () => {
  const { state } = useStore();
  const { pageId } = useParams<TParams>();
  const page = usePage(pageId);
  const getTracker = useGetTracker();
  const pageItemAdd = usePageItemAdd();
  const [currentInputIds, setCurrentInputIds] = React.useState<TInputs>({});
  const [inputTime, setInputTime] = React.useState(new Date());
  const inputDelete = useInputDelete();
  const inputUpdate = useInputUpdate();
  const inputCreate = useInputCreate();

  // menu
  const [menuEl, setMenuEl] = React.useState<undefined | HTMLElement>();
  const closeMenu = () => setMenuEl(undefined);

  // keep a record of which inputs have been created by this page for easy updating
  const currentInputs = Object.fromEntries(
    Object.entries(currentInputIds)
      .map(([trackerId, inputId]) => [
        trackerId,
        state.inputs.find((d) => d._id === inputId),
      ])
      .filter(([_, input]) => Boolean(input))
  );

  // handle input changes
  const setValue = (trackerId: string, value: TInputPrimitive | undefined) => {
    if (currentInputIds[trackerId]) {
      if (value === "" || value === undefined) {
        // remove a set input that has been changed to empty
        const newInputs = { ...currentInputIds };
        delete newInputs[trackerId];
        setCurrentInputIds({ ...newInputs });
        inputDelete(currentInputs[trackerId]);
      } else {
        // replace a set input value
        const newInput = { ...currentInputs[trackerId], value };
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
        setCurrentInputIds({ ...currentInputIds, [trackerId]: newInput._id });
        inputCreate(newInput);
      }
    }
  };

  if (!page) return null;

  return (
    <Layout title={page.title} back="/">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          borderBottom: `1px solid rgba(224, 224, 224, 1);`,
          p: 2,
        }}
      >
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Set time"
          value={inputTime}
          onChange={(newValue) => {
            setInputTime(newValue || new Date());
          }}
        />
        <IconButton
          size="small"
          aria-label="actions"
          onClick={(e) => {
            setMenuEl(e.currentTarget);
          }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </Stack>
      {page.items.length ? (
        page.items.map((item) => {
          if (item.type === "tracker") {
            const tracker = getTracker(item._id);
            if (!tracker) return null;
            return (
              <Box
                key={tracker._id}
                sx={{
                  borderBottom: `1px solid rgba(224, 224, 224, 1);`,
                }}
              >
                <InputEntry
                  trackerId={tracker._id}
                  value={currentInputs[tracker._id]?.value}
                  setValue={setValue}
                />
              </Box>
            );
          }
          return null;
        })
      ) : (
        <Typography align="center" sx={{ p: 2 }}>
          No items added yet, add a new one below
        </Typography>
      )}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        sx={{ p: 2 }}
      >
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          component={Link}
          to={`/`}
        >
          Done
        </Button>
      </Box>
      <Menu anchorEl={menuEl} open={!!menuEl} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            pageItemAdd.open({ page });
          }}
        >
          Add tracker to this page
        </MenuItem>
        <MenuItem component={Link} to={`/page/${page._id}`}>
          Edit this page
        </MenuItem>
        <MenuItem component={Link} to={`/pages`}>
          Manage pages
        </MenuItem>
      </Menu>
      {pageItemAdd.component}
    </Layout>
  );
};

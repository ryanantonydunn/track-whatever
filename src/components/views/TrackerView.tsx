import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useInputDelete } from "../../data/actions/input-delete";
import { useInputsGetAll } from "../../data/actions/inputs-get-all";
import { useTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { InputValue } from "../base/InputValue";
import { Layout } from "../base/Layout";
import { useConfirmDialog } from "../modals/ConfirmDialog";
import { useInputEdit } from "../modals/InputEdit";
import { Error404 } from "./404";

import { Add, ArrowLeft, ArrowRight, MoreVert } from "@mui/icons-material";
import { Fab, Menu, MenuItem } from "@mui/material";
import { isSameDay } from "date-fns";
import { useTrackerDelete } from "../../data/actions/tracker-delete";
import { TInput } from "../../types";
import { primaryGradient } from "../../utils/gradient";
import { useInputAdd } from "../modals/InputAdd";
import { useTrackerEdit } from "../modals/TrackerEdit";

type TParams = { trackerId: string };
type TInputsByDay = { date: string; inputs: TInput[] }[];

export const TrackerView: React.FC = () => {
  const { state } = useStore();
  const { trackerId } = useParams<TParams>();
  const tracker = useTracker(trackerId);

  // tracker menu
  const [menuElTracker, setMenuElTracker] = React.useState<
    undefined | HTMLElement
  >();
  const closeMenuTracker = () => setMenuElTracker(undefined);

  // input menu
  const [menuElInput, setMenuElInput] = React.useState<
    undefined | HTMLElement
  >();
  const [menuItemInput, setMenuItemInput] = React.useState<
    undefined | TInput
  >();
  const closeMenuInput = () => setMenuElInput(undefined);

  // modals
  const confirmDialog = useConfirmDialog();
  const inputDelete = useInputDelete();
  const inputEdit = useInputEdit();
  const inputAdd = useInputAdd();
  const trackerEdit = useTrackerEdit();
  const trackerDelete = useTrackerDelete();

  // load the inputs
  const { load, next, previous, hasNext, hasPrevious, pageNumber, loading } =
    useInputsGetAll();
  React.useEffect(() => {
    load(1);
  }, [load]);

  // sort inputs by day
  const inputsByDay = React.useMemo(() => {
    const byDay: TInputsByDay = [];
    state.inputs.forEach((input) => {
      const lastDay = byDay[byDay.length - 1];
      if (isSameDay(new Date(input.date), new Date(lastDay?.date))) {
        lastDay.inputs.push(input);
      } else {
        byDay.push({ date: input.date, inputs: [input] });
      }
    });
    return byDay;
  }, [state.inputs]);

  if (!tracker || !trackerId) return <Error404 />;

  return (
    <Layout title={tracker.title} back="/trackers">
      <TableContainer sx={{ mt: 2 }}>
        {loading ? null : state.inputs.length ? (
          <Table size="small" aria-label="tracker inputs">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Time</b>
                </TableCell>
                <TableCell>
                  <b>Entry</b>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    aria-label="tracker actions"
                    onClick={(e) => {
                      setMenuElTracker(e.currentTarget);
                    }}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inputsByDay.map((byDay) => (
                <React.Fragment key={byDay.date}>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                      <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
                        {format(new Date(byDay.date), "d MMM yyyy")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {byDay.inputs.map((input) => (
                    <TableRow key={input._id}>
                      <TableCell>
                        {format(new Date(input.date), "HH:mm")}
                      </TableCell>
                      <TableCell>
                        <InputValue input={input} />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          aria-label="input actions"
                          onClick={(e) => {
                            setMenuElInput(e.currentTarget);
                            setMenuItemInput(input);
                          }}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography align="center" sx={{ p: 2 }}>
            No data entered yet
          </Typography>
        )}
      </TableContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2 }}
      >
        <IconButton
          size="small"
          aria-label="Previous page"
          disabled={!hasPrevious}
          onClick={() => previous()}
        >
          <ArrowLeft />
        </IconButton>
        <Typography sx={{ mx: 2 }}>Page {pageNumber}</Typography>
        <IconButton
          size="small"
          aria-label="Next page"
          disabled={!hasNext}
          onClick={() => next()}
        >
          <ArrowRight />
        </IconButton>
      </Stack>
      <Fab
        color="primary"
        aria-label="add entries"
        sx={{
          position: "fixed",
          bottom: 14,
          right: 14,
          background: primaryGradient,
        }}
        onClick={() => {
          inputAdd.open({ trackerId });
        }}
      >
        <Add />
      </Fab>
      <Menu
        anchorEl={menuElInput}
        open={!!menuElInput}
        onClose={closeMenuInput}
      >
        <MenuItem
          onClick={() => {
            closeMenuInput();
            inputEdit.open({ inputId: menuItemInput?._id || "" });
          }}
        >
          Edit Input
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenuInput();
            confirmDialog.open({
              title: "Confirm delete entry",
              description: "Are you sure you want to delete this entry?",
              onConfirm: () => {
                if (menuItemInput) inputDelete(menuItemInput);
              },
            });
          }}
        >
          Delete Input
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={menuElTracker}
        open={!!menuElTracker}
        onClose={closeMenuTracker}
      >
        <MenuItem component={Link} to={`/compare?trackers=${trackerId}`}>
          Compare Tracker
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenuTracker();
            trackerEdit.open({ trackerId });
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
                if (tracker) trackerDelete(tracker);
              },
            });
          }}
        >
          Delete Tracker
        </MenuItem>
      </Menu>
      {inputEdit.component}
      {inputAdd.component}
      {trackerEdit.component}
      {confirmDialog.component}
    </Layout>
  );
};

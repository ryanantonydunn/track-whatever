import {
  Box,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format, isSameDay } from "date-fns";
import React from "react";
import { useLoadInputs } from "../../data/actions/inputs-get";
import { useGetTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { InputValue } from "../base/InputValue";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { Add, MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { usePageChoose } from "../modals/PageChoose";
import { TInput } from "../../types";
import { useInputDelete } from "../../data/actions/input-delete";
import { useInputEdit } from "../modals/InputEdit";

type TInputsByDay = { date: string; inputs: TInput[] }[];

export const DataView: React.FC = () => {
  const { state } = useStore();
  const getTracker = useGetTracker();
  const pageChoose = usePageChoose();
  const [inputMenuEl, setInputMenuEl] = React.useState<
    undefined | HTMLElement
  >();
  const [inputMenuInput, setInputMenuInput] = React.useState<
    undefined | TInput
  >();

  const closeMenu = () => setInputMenuEl(undefined);

  const confirmDialog = useConfirmDialog();
  const inputDelete = useInputDelete();
  const inputEdit = useInputEdit();

  // load the inputs
  const { load, loading } = useLoadInputs();
  React.useEffect(() => {
    load({
      limit: 50,
      skip: 0,
    });
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

  const fabProps =
    state.pages.length > 1
      ? {
          onClick: pageChoose.open,
        }
      : {
          component: Link,
          to: `/entry/${state.pages[0]?._id}`,
        };

  return (
    <Layout title="Track Whatever">
      <Box sx={{ borderBottom: "1px solid grey.300", paddingBottom: 4 }}>
        <TableContainer sx={{ mt: 2 }}>
          {loading ? null : state.inputs.length ? (
            <Table size="small" aria-label="tracker inputs">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Tracker</b>
                  </TableCell>
                  <TableCell>
                    <b>Entry</b>
                  </TableCell>
                  <TableCell>&nbsp;</TableCell>
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
                          {getTracker(input.trackerId)?.title}
                        </TableCell>
                        <TableCell>
                          <InputValue input={input} />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            aria-label="actions"
                            onClick={(e) => {
                              setInputMenuEl(e.currentTarget);
                              setInputMenuInput(input);
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
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 14, right: 14 }}
        {...fabProps}
      >
        <Add />
      </Fab>
      <Menu anchorEl={inputMenuEl} open={!!inputMenuEl} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu();
            inputEdit.open({ inputId: inputMenuInput?._id || "" });
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            confirmDialog.open({
              title: "Confirm delete entry",
              description: "Are you sure you want to delete this entry?",
              onConfirm: () => {
                if (inputMenuInput) inputDelete(inputMenuInput);
              },
            });
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {inputEdit.component}
      {confirmDialog.component}
    </Layout>
  );
};

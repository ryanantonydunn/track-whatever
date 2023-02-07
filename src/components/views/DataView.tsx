import { Add, ArrowLeft, ArrowRight, MoreVert } from "@mui/icons-material";
import {
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
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
import { Link } from "react-router-dom";
import { useInputDelete } from "../../data/actions/input-delete";
import { useInputsGetAll } from "../../data/actions/inputs-get-all";
import { useGetTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { TInput } from "../../types";
import { primaryGradient } from "../../utils/gradient";
import { useConfirmDialog } from "../modals/ConfirmDialog";
import { InputValue } from "../base/InputValue";
import { Layout } from "../base/Layout";
import { useInputEdit } from "../modals/InputEdit";
import { usePageChoose } from "../modals/PageChoose";

type TInputsByDay = { date: string; inputs: TInput[] }[];

export const DataView: React.FC = () => {
  const { state } = useStore();
  const getTracker = useGetTracker();
  const pageChoose = usePageChoose();

  const [menuEl, setMenuEl] = React.useState<undefined | HTMLElement>();
  const [menuItem, setMenuItem] = React.useState<undefined | TInput>();
  const closeMenu = () => setMenuEl(undefined);

  const confirmDialog = useConfirmDialog();
  const inputDelete = useInputDelete();
  const inputEdit = useInputEdit();

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
      <TableContainer sx={{ mt: 2 }}>
        {loading ? null : state.inputs.length ? (
          <Table size="small" aria-label="tracker inputs">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Time</b>
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
                    <TableCell
                      colSpan={4}
                      sx={{
                        textAlign: "center",
                        backgroundColor: "rgba(0,0,0,0.05)",
                      }}
                    >
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
                            setMenuEl(e.currentTarget);
                            setMenuItem(input);
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
        {...fabProps}
      >
        <Add />
      </Fab>
      <Menu anchorEl={menuEl} open={!!menuEl} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu();
            inputEdit.open({ inputId: menuItem?._id || "" });
          }}
        >
          Edit Input
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            confirmDialog.open({
              title: "Confirm delete entry",
              description: "Are you sure you want to delete this entry?",
              onConfirm: () => {
                if (menuItem) inputDelete(menuItem);
              },
            });
          }}
        >
          Delete Input
        </MenuItem>
      </Menu>
      {inputEdit.component}
      {confirmDialog.component}
      {pageChoose.component}
    </Layout>
  );
};

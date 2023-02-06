import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { endOfMonth, format, startOfMonth } from "date-fns";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useConfirmDialog } from "../modals/ConfirmDialog";
import { Layout } from "../base/Layout";
import { Error404 } from "./404";
import { useInputEdit } from "../modals/InputEdit";
import { InputValue } from "../base/InputValue";
import { useInputAdd } from "../modals/InputAdd";
import { useInputDelete } from "../../data/actions/input-delete";
import { useStore } from "../../data/provider";
import { useTracker } from "../../data/hooks";
import { useInputsGetAll } from "../../data/actions/inputs-get-all";
import { DatePicker } from "@mui/x-date-pickers";

type TParams = {
  trackerId: string;
};

export const TrackerView: React.FC = () => {
  const confirmDialog = useConfirmDialog();
  const inputEdit = useInputEdit();
  const inputAdd = useInputAdd();
  const { trackerId } = useParams<TParams>();
  const tracker = useTracker(trackerId);
  const inputDelete = useInputDelete();
  const { state } = useStore();

  const [dateFrom, setDateFrom] = React.useState(startOfMonth(new Date()));
  const [dateTo, setDateTo] = React.useState(endOfMonth(new Date()));

  // load the inputs
  const { load, loading } = useInputsGetAll();
  React.useEffect(() => {
    load(1);
  }, [load, trackerId, dateFrom, dateTo]);

  if (!tracker || !trackerId) return <Error404 />;

  return (
    <Layout title={tracker.title} back="/trackers">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" sx={{ py: 2 }}>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="Date from"
            value={dateFrom}
            maxDate={dateTo}
            onChange={(newValue) => {
              setDateFrom(newValue || startOfMonth(new Date()));
            }}
          />
          <Box sx={{ mx: 2 }}> to </Box>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="Date to"
            value={dateTo}
            minDate={dateFrom}
            onChange={(newValue) => {
              setDateTo(newValue || endOfMonth(new Date()));
            }}
          />
        </Stack>
        <TableContainer component={Paper}>
          {loading ? null : state.inputs.length ? (
            <Table size="small" aria-label="tracker inputs">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.inputs.map((input) => (
                  <TableRow
                    key={input._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {format(new Date(input.date), "d MMM yyyy - HH:mm")}
                    </TableCell>
                    <TableCell>
                      <InputValue input={input} />
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      <IconButton
                        size="medium"
                        aria-label="edit input value"
                        onClick={() => {
                          inputEdit.open({ inputId: input._id });
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="delete input"
                        onClick={() => {
                          confirmDialog.open({
                            title: "Confirm delete input",
                            description:
                              "Are you sure you want to delete this input?",
                            onConfirm: async () => {
                              await inputDelete(input);
                            },
                          });
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography align="center" sx={{ p: 2 }}>
              No inputs yet
            </Typography>
          )}
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button
            variant="text"
            size="small"
            component={Link}
            to={`/compare?trackers=${trackerId}`}
            sx={{ mr: 2 }}
          >
            Compare
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              inputAdd.open({ trackerId });
            }}
          >
            Add Entry
          </Button>
        </Box>
      </Container>
      {confirmDialog.component}
      {inputEdit.component}
      {inputAdd.component}
    </Layout>
  );
};

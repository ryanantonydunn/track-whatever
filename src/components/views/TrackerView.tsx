import { Delete, Edit } from "@mui/icons-material";
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { useParams } from "react-router-dom";
import { useInputsByTracker, useTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { Error404 } from "./404";
import { formatInputValue } from "../../utils/format-input-value";

type TParams = {
  trackerId: string;
};

export const TrackerView: React.FC = () => {
  const confirmDialog = useConfirmDialog();
  const { dispatch } = useStore();
  const { trackerId } = useParams<TParams>();
  const tracker = useTracker(trackerId);
  const inputs = useInputsByTracker(trackerId);

  if (!tracker) return <Error404 />;

  return (
    <Layout title={tracker.title}>
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="tracker inputs">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inputs.map((input) => (
                <TableRow
                  key={input.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {format(new Date(input.date), "d MMM yyyy - H:m")}
                  </TableCell>
                  <TableCell>{formatInputValue(input.value)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="medium"
                      aria-label="edit input value"
                      onClick={() => {
                        console.log("edit");
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
                          onConfirm: () => {
                            dispatch({
                              type: Actions.DELETE_INPUT,
                              payload: input.id,
                            });
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
        </TableContainer>
      </Container>
      {confirmDialog.component}
    </Layout>
  );
};

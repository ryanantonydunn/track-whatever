import { Button, Container, Typography } from "@mui/material";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Actions } from "../../data/reducer";
import { defaultData, useStore } from "../../data/provider";

type TDataError = {
  children: React.ReactNode;
};

export const DataError: React.FC<TDataError> = ({ children }) => {
  const confirmDialog = useConfirmDialog();
  const { state, dispatch } = useStore();

  return !state.trackers || !state.inputs ? (
    <Container maxWidth="md">
      <Typography align="center" sx={{ p: 2 }}>
        Something has gone wrong with your data. If you imported your data
        recently, please check that the file was correct.
      </Typography>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        sx={{ mt: 2 }}
        color="error"
        onClick={() => {
          confirmDialog.open({
            title: "Confirm reset data",
            description:
              "This will remove all current data and reset you to the default? Are you sure you want to do this?",
            onConfirm: () => {
              dispatch({
                type: Actions.RESET_ALL_DATA,
                payload: defaultData,
              });
            },
          });
        }}
      >
        Reset data to default
      </Button>
      {confirmDialog.component}
    </Container>
  ) : (
    <>{children}</>
  );
};

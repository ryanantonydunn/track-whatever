import { Button, Container } from "@mui/material";
import React from "react";
// import { useParams } from "react-router-dom";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { defaultData, useStore } from "../../data/provider";
import { downloadTextFile } from "../../utils/download-file";
import { Actions } from "../../data/reducer";

export const ImportExport: React.FC = () => {
  const confirmDialog = useConfirmDialog();
  const { state, dispatch } = useStore();

  // export all data to json
  const exportJSON = React.useCallback(() => {
    const fileName = `track-${new Date().toISOString()}.json`;
    const text = JSON.stringify(state);
    downloadTextFile(fileName, text);
  }, [state]);

  // import all data from json
  const importJSON = React.useCallback(
    (file?: File) => {
      if (!file) {
        alert("Invalid file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          try {
            const newData = JSON.parse(e.target.result);
            dispatch({
              type: Actions.RESET_ALL_DATA,
              payload: newData,
            });
          } catch (e) {
            console.error(e);
          }
        }
      };
      reader.readAsText(file);
    },
    [dispatch]
  );

  return (
    <Layout title="Import/Export Data">
      <Container maxWidth="md">
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => {
            exportJSON();
          }}
        >
          Export data as JSON
        </Button>
        <Button
          fullWidth
          variant="outlined"
          component="label"
          size="large"
          sx={{ mt: 2 }}
        >
          Import data from JSON
          <input
            hidden
            accept="application/json"
            multiple
            type="file"
            onChange={(e) => {
              confirmDialog.open({
                title: "Confirm import data",
                description:
                  "This will overwrite all your current data with imported data, are you sure you want to proceed?",
                onConfirm: () => {
                  importJSON(e.target.files?.[0]);
                },
              });
            }}
          />
        </Button>
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
      </Container>
      {confirmDialog.component}
    </Layout>
  );
};

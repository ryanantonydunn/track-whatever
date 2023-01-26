import { Button, Container } from "@mui/material";
import React from "react";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { dataDownload } from "../../data/actions/data-download";
import { dataImport } from "../../data/actions/data-import";
import { dataReset } from "../../data/actions/data-reset";

export const ImportExport: React.FC = () => {
  const confirmDialog = useConfirmDialog();

  return (
    <Layout title="Import/Export Data" back="/">
      <Container maxWidth="md">
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => {
            dataDownload();
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
                  dataImport(e.target.files?.[0]);
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
                dataReset();
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

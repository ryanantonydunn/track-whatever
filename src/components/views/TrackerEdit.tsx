import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "../../data/hooks";
import { Layout } from "../base/Layout";
import { TrackerAddEditForm } from "./TrackerAddEditForm";

type TTrackerViewParams = {
  trackerId: string;
};

export const TrackerEdit: React.FC = () => {
  const { trackerId } = useParams<TTrackerViewParams>();
  const [tracker, setTracker] = useTracker(trackerId);

  if (!tracker) {
    // return <Navigate to="/" replace />;
    return null;
  }

  return (
    <Layout title="Edit Tracker">
      <Container maxWidth="sm">
        <TrackerAddEditForm tracker={tracker} setTracker={setTracker} />
      </Container>
    </Layout>
  );
};

import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTrackers } from "../../data/hooks";
import { Layout } from "../base/Layout";
import { TrackInput } from "../base/TrackInput";
import { useTrackerAdd } from "../modals/TrackerAdd";
import { TTracker } from "../../types";

type TParams = {
  pageId: string;
};

export const PageView: React.FC = () => {
  const { pageId } = useParams<TParams>();
  const trackers = useTrackers();
  const trackerAdd = useTrackerAdd();

  return (
    <Layout title="Trackers">
      <Container maxWidth="sm">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List>
            {trackers.length ? (
              trackers.map((tracker) => {
                // const tracker = getTracker(trackerId);
                // if (!tracker) return null;
                return (
                  <ListItem key={tracker.id}>
                    <TrackInput
                      tracker={tracker}
                      setValue={(value) => {
                        console.log("yeah", value);
                      }}
                    />
                  </ListItem>
                );
              })
            ) : (
              <Typography align="center" sx={{ p: 2 }}>
                No trackers yet, add a new one below
              </Typography>
            )}
          </List>
        </Box>
        <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              trackerAdd.open({
                onSave: (newTracker) => {
                  console.log(newTracker, "TODO add to end of page later");
                },
              });
            }}
          >
            Add New Tracker
          </Button>
        </Box>
      </Container>
      {trackerAdd.component}
    </Layout>
  );
};

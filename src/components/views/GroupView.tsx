import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetTracker, useGroup } from "../../data/hooks";
import { Layout } from "../base/Layout";
import { TrackInput } from "../base/TrackInput";

type TGroupViewParams = {
  groupId: string;
};

export const GroupView: React.FC = () => {
  const { groupId } = useParams<TGroupViewParams>();
  const [group] = useGroup(groupId);
  const getTracker = useGetTracker();

  if (!group) {
    // return <Navigate to="/" replace />;
    return null;
  }

  return (
    <Layout title={group.title}>
      <Container maxWidth="sm">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List>
            {group.trackers.length ? (
              group.trackers.map((trackerId) => {
                const tracker = getTracker(trackerId);
                if (!tracker) return null;
                return (
                  <ListItem key={groupId}>
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
              <Typography
                component={Link}
                to={`/edit-group/${groupId}`}
                align="center"
                sx={{ p: 2 }}
              >
                No trackers yet, click to edit this group and add some
              </Typography>
            )}
          </List>
        </Box>
      </Container>
    </Layout>
  );
};

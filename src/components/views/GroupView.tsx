import { Edit } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../base/Layout";
import { useGroup } from "../../data/hooks";

type TGroupViewParams = {
  groupId: string;
};

export const GroupView: React.FC = () => {
  const { groupId } = useParams<TGroupViewParams>();
  const [group] = useGroup(groupId);

  if (!group) {
    // return <Navigate to="/" replace />;
    return null;
  }

  return (
    <Layout title={group.title}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="edit tracker group"
            sx={{ mr: 2 }}
            component={Link}
            to={`/edit-group/${group.id}`}
          >
            <Edit />
          </IconButton>
        </Box>
      </Container>
    </Layout>
  );
};

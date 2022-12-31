import { Box, Button, Container, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { TGroup } from "../../types";
import { Layout } from "../base/Layout";
import { GroupAddEditForm } from "./GroupAddEditForm";
import { v4 as uuidv4 } from "uuid";

export const GroupAdd: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const [group, setGroup] = React.useState<TGroup>({
    id: uuidv4(),
    title: "New Group",
    trackers: [],
  });

  return (
    <Layout title="Edit Group">
      <Container maxWidth="sm">
        <GroupAddEditForm group={group} setGroup={setGroup} />
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box display="flex" sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              dispatch({
                type: Actions.CREATE_GROUP,
                payload: group,
              });
              navigate("/");
            }}
          >
            Save New Group
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

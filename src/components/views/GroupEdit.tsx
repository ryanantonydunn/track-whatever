import { Box, Button, Container, Divider } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGroup } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { GroupAddEditForm } from "./GroupAddEditForm";

type TGroupViewParams = {
  groupId: string;
};

export const GroupEdit: React.FC = () => {
  const navigate = useNavigate();
  const confirmDialog = useConfirmDialog();
  const { groupId } = useParams<TGroupViewParams>();
  const [group, setGroup] = useGroup(groupId);
  const { dispatch } = useStore();

  if (!group) {
    // return <Navigate to="/" replace />;
    return null;
  }

  return (
    <Layout title="Edit Group">
      <Container maxWidth="sm">
        <GroupAddEditForm group={group} setGroup={setGroup} />
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box display="flex" sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => {
              confirmDialog.open({
                title: "Confirm delete group",
                description:
                  "Are you sure you want to remove this group. This will not remove your trackers, only the group display page. You can add them to a different group later.",
                onConfirm: () => {
                  dispatch({
                    type: Actions.DELETE_GROUP,
                    payload: groupId || "",
                  });
                  navigate("/");
                },
              });
            }}
          >
            Delete Group
          </Button>
        </Box>
      </Container>
      {confirmDialog.component}
    </Layout>
  );
};

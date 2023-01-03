// import { Box, Button, Container, Divider } from "@mui/material";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useStore } from "../../data/provider";
// import { Actions } from "../../data/reducer";
// import { TGroup } from "../../types";
// import { Layout } from "../base/Layout";
// import { GroupAddEditForm } from "./GroupAddEditForm";

// export const GroupAdd: React.FC = () => {
//   const navigate = useNavigate();
//   const { state, dispatch } = useStore();
//   const group = state.create.group;

//   const setGroup = React.useCallback(
//     (newGroup: TGroup) => {
//       dispatch({ type: Actions.UPDATE_GROUP, payload: newGroup });
//     },
//     [dispatch]
//   );

//   return (
//     <Layout title="Add Group">
//       <Container maxWidth="sm">
//         <GroupAddEditForm group={group} setGroup={setGroup} />
//         <Divider sx={{ mt: 2, mb: 2 }} />
//         <Box display="flex" sx={{ p: 2 }}>
//           <Button
//             variant="outlined"
//             onClick={() => {
//               dispatch({ type: Actions.CLEAR_CREATE_GROUP });
//               navigate(-1);
//             }}
//             sx={{ flexGrow: 1, mr: 2 }}
//             size="large"
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => {
//               dispatch({
//                 type: Actions.CREATE_GROUP,
//                 payload: group,
//               });
//               dispatch({ type: Actions.CLEAR_CREATE_GROUP });
//               navigate(-1);
//             }}
//             sx={{ flexGrow: 1 }}
//             size="large"
//           >
//             Save New Group
//           </Button>
//         </Box>
//       </Container>
//     </Layout>
//   );
// };
export {};

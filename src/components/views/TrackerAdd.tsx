// import { Box, Button, Container, Divider } from "@mui/material";
// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useGroup } from "../../data/hooks";
// import { useStore } from "../../data/provider";
// import { Actions } from "../../data/reducer";
// import { TTracker } from "../../types";
// import { Layout } from "../base/Layout";
// import { TrackerAddEditForm } from "./TrackerAddEditForm";

// type Params = {
//   groupId: string;
// };

// export const TrackerAdd: React.FC = () => {
//   const { groupId } = useParams<Params>();
//   const [group, setGroup] = useGroup(groupId);
//   const navigate = useNavigate();
//   const { state, dispatch } = useStore();
//   const tracker = state.create.tracker;

//   const setTracker = React.useCallback(
//     (newTracker: TTracker) => {
//       dispatch({ type: Actions.UPDATE_TRACKER, payload: newTracker });
//     },
//     [dispatch]
//   );

//   if (!group) return null;

//   return (
//     <Layout title="Add Tracker">
//       <Container maxWidth="sm">
//         <TrackerAddEditForm tracker={tracker} setTracker={setTracker} />
//         <Divider sx={{ mt: 2, mb: 2 }} />
//         <Box display="flex" sx={{ p: 2 }}>
//           <Button
//             variant="outlined"
//             onClick={() => {
//               dispatch({ type: Actions.CLEAR_CREATE_TRACKER });
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
//                 type: Actions.CREATE_TRACKER,
//                 payload: tracker,
//               });
//               setGroup({ ...group, trackers: [...group.trackers, tracker.id] });
//               dispatch({ type: Actions.CLEAR_CREATE_TRACKER });
//               navigate(-1);
//             }}
//             sx={{ flexGrow: 1 }}
//             size="large"
//           >
//             Save New Tracker
//           </Button>
//         </Box>
//       </Container>
//     </Layout>
//   );
// };
export {};

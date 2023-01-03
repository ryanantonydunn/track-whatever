// import { ArrowDownward, ArrowUpward, Delete, Edit } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemSecondaryAction,
//   ListItemText,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { Link } from "react-router-dom";
// import { useGetTracker, useTrackers } from "../../data/hooks";
// import { TGroup } from "../../types";
// import { moveDown, moveUp } from "../../utils/reorder-array";

// type TGroupAddEditForm = {
//   group: TGroup;
//   setGroup: (group: TGroup) => void;
// };

// export const GroupAddEditForm: React.FC<TGroupAddEditForm> = ({
//   group,
//   setGroup,
// }) => {
//   const trackers = useTrackers();
//   const [trackerModalOpen, setTrackerModalOpen] = React.useState(false);
//   const getTracker = useGetTracker();
//   return (
//     <>
//       <Box sx={{ p: 2 }}>
//         <TextField
//           fullWidth
//           label="Title"
//           value={group.title}
//           error={!group.title}
//           helperText={!group.title ? "Please enter a title" : ""}
//           onChange={(e) => {
//             setGroup({ ...group, title: e.currentTarget.value.slice(0, 100) });
//           }}
//         />
//       </Box>
//       <Typography variant="h6" component="h3" sx={{ p: 2 }}>
//         Trackers
//       </Typography>
//       <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
//         <List>
//           {group.trackers.length ? (
//             group.trackers.map((trackerId, i) => {
//               const tracker = getTracker(trackerId);
//               if (!tracker) return null;
//               return (
//                 <ListItem disablePadding key={trackerId}>
//                   <ListItemText sx={{ p: 1, pl: 3 }}>
//                     {tracker.title}
//                   </ListItemText>
//                   <ListItemSecondaryAction>
//                     <IconButton
//                       size="medium"
//                       aria-label="move up"
//                       onClick={() => {
//                         setGroup({
//                           ...group,
//                           trackers: moveUp(group.trackers, i),
//                         });
//                       }}
//                     >
//                       <ArrowUpward />
//                     </IconButton>
//                     <IconButton
//                       size="medium"
//                       aria-label="move down"
//                       onClick={() => {
//                         setGroup({
//                           ...group,
//                           trackers: moveDown(group.trackers, i),
//                         });
//                       }}
//                     >
//                       <ArrowDownward />
//                     </IconButton>
//                     <IconButton
//                       size="medium"
//                       aria-label="edit tracker"
//                       component={Link}
//                       to={`/edit-tracker/${trackerId}`}
//                     >
//                       <Edit />
//                     </IconButton>
//                     <IconButton
//                       size="medium"
//                       aria-label="remove from this group"
//                       onClick={() => {
//                         const trackers = [...group.trackers];
//                         trackers.splice(i, 1);
//                         setGroup({ ...group, trackers });
//                       }}
//                     >
//                       <Delete />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>
//               );
//             })
//           ) : (
//             <Typography align="center" sx={{ p: 2 }}>
//               No trackers yet, add one below
//             </Typography>
//           )}
//         </List>
//       </Box>
//       <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
//         <Button
//           variant="text"
//           size="small"
//           onClick={() => {
//             setTrackerModalOpen(true);
//           }}
//           sx={{ mr: 1 }}
//         >
//           Add Existing Tracker
//         </Button>
//         <Button
//           variant="text"
//           size="small"
//           component={Link}
//           to={`/add-tracker/${group.id}`}
//         >
//           Add New Tracker
//         </Button>
//       </Box>
//       <Dialog
//         open={trackerModalOpen}
//         onClose={() => setTrackerModalOpen(false)}
//         scroll="body"
//         aria-labelledby="add-tracker-title"
//       >
//         <DialogTitle id="scroll-dialog-title">Add Existing Tracker</DialogTitle>
//         <DialogContent dividers sx={{ p: 0 }}>
//           <List>
//             {trackers.map((tracker) => (
//               <ListItem disablePadding key={tracker.id}>
//                 <ListItemButton
//                   dense
//                   disabled={group.trackers.includes(tracker.id)}
//                   onClick={() => {
//                     setGroup({
//                       ...group,
//                       trackers: [...group.trackers, tracker.id],
//                     });
//                     setTrackerModalOpen(false);
//                   }}
//                 >
//                   <ListItemText primary={tracker.title} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };
export {};

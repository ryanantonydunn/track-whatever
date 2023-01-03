// import {
//   Box,
//   Button,
//   Container,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { Layout } from "../base/Layout";
// import { useGroups } from "../../data/hooks";
// import { Link } from "react-router-dom";

// export const Home: React.FC = () => {
//   const groups = useGroups();
//   return (
//     <Layout title="Track Whatever" back={false}>
//       <Container maxWidth="sm">
//         <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
//           <nav aria-label="tracker groups">
//             <List>
//               {groups?.length ? (
//                 groups.map((group) => (
//                   <ListItem disablePadding key={group.id}>
//                     <ListItemButton component={Link} to={`/group/${group.id}`}>
//                       <ListItemText primary={group.title || "Untitled Group"} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))
//               ) : (
//                 <Typography align="center" sx={{ p: 2 }}>
//                   No tracking groups yet, add one below
//                 </Typography>
//               )}
//             </List>
//           </nav>
//         </Box>
//         <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
//           <Button
//             variant="text"
//             size="small"
//             component={Link}
//             to="/edit-groups"
//             sx={{ mr: 1 }}
//           >
//             Edit Groups
//           </Button>
//           <Button variant="text" size="small" component={Link} to="/add-group">
//             Add New Group
//           </Button>
//         </Box>
//       </Container>
//     </Layout>
//   );
// };
export {};

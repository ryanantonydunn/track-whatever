// import { Container } from "@mui/material";
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useTracker } from "../../data/hooks";
// import { Layout } from "../base/Layout";
// import { TrackerAddEditForm } from "./TrackerAddEditForm";

// type Params = {
//   trackerId: string;
// };

// export const TrackerEdit: React.FC = () => {
//   const { trackerId } = useParams<Params>();
//   const [tracker, setTracker] = useTracker(trackerId);

//   if (!tracker) {
//     // return <Navigate to="/" replace />;
//     return null;
//   }

//   return (
//     <Layout title="Edit Tracker">
//       <Container maxWidth="sm">
//         <TrackerAddEditForm
//           isEditing
//           tracker={tracker}
//           setTracker={setTracker}
//         />
//       </Container>
//     </Layout>
//   );
// };
export {};

// import { Container } from "@mui/material";
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGroup } from "../../data/hooks";
// import { Layout } from "../base/Layout";
// import { GroupAddEditForm } from "./GroupAddEditForm";

// type TGroupViewParams = {
//   groupId: string;
// };

// export const GroupEdit: React.FC = () => {
//   const { groupId } = useParams<TGroupViewParams>();
//   const [group, setGroup] = useGroup(groupId);

//   if (!group) {
//     // return <Navigate to="/" replace />;
//     return null;
//   }

//   return (
//     <Layout title="Edit Group">
//       <Container maxWidth="sm">
//         <GroupAddEditForm group={group} setGroup={setGroup} />
//       </Container>
//     </Layout>
//   );
// };
export {};

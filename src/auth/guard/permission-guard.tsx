// import React, { FC } from "react";
// import { Container, Typography } from "@mui/material";
// import { useAppSelector } from "src/redux/hooks";
// import { ForbiddenIllustration } from "src/assets/illustrations";
// import { UserRoles } from "src/types/user";
// import {
//   CampaignAccess,
//   PermissionEntity,
//   UserAccess,
// } from "src/types/onboarding";

// // Define the PermissionGuardProp type
// type PermissionGuardProp = {
//   hasContent?: boolean;
//   roles: UserRoles[];
//   access: UserAccess | CampaignAccess;
//   entity: PermissionEntity;
//   children: React.ReactNode;
// };

// export const PermissionGuard: FC<PermissionGuardProp> = ({
//   hasContent,
//   roles,
//   entity,
//   access,
//   children,
// }) => {
//   const { user } = useAppSelector((state) => state.auth);

//   const isPermitted =
//     !!user?.onboarding?.superAdmin ||
//     roles.some(
//       (role) => user?.onboarding?.[role]?.permission?.[entity]?.[access]
//     );

//   if (!isPermitted) {
//     return hasContent ? (
//       <Container
//         sx={{
//           textAlign: "center",
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h3" sx={{ mb: 2 }}>
//           Permission Denied
//         </Typography>
//         <Typography sx={{ color: "text.secondary" }}>
//           You do not have permission to access this page
//         </Typography>
//         <ForbiddenIllustration
//           sx={{
//             height: 260,
//             my: { xs: 5, sm: 10 },
//           }}
//         />
//       </Container>
//     ) : null;
//   }

//   return <>{children}</>;
// };

// const Footer: FC = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       sx={{ mt: 12 }}
//     >
//       &copy; {currentYear}. All rights reserved.
//     </Typography>
//   );
// };

// export default Footer;

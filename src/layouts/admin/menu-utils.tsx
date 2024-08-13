// import {
//   Collapse,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import React from "react";
// import MailIcon from "@mui/icons-material/Mail";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";

// const renderMenuItems = (items: any[]) => {
//   return items.map((item, index) => (
//     <React.Fragment key={index}>
//       <ListItem
//         button
//         // onClick={() => (item.children ? handleClick(item.text) : null)}
//         className="rounded-sm"
//         sx={{
//           borderRadius: 2,
//         }}
//       >
//         <ListItemIcon className="text-xl">{item.icon}</ListItemIcon>
//         <ListItemText primary={item.text} />
//         {item.children ? (
//           openItems[item.text] ? (
//             <ExpandLess />
//           ) : (
//             <ExpandMore />
//           )
//         ) : null}
//       </ListItem>
//       {item.children && (
//         <Collapse in={openItems[item.text]} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding className="pl-3">
//             {renderMenuItems(item.children)}
//           </List>
//         </Collapse>
//       )}
//     </React.Fragment>
//   ));
// };

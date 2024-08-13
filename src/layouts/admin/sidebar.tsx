import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  IconButton,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { adminMenuItems } from "./config-navigation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

const drawerWidth = 251;

interface AdminSidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleClick = (item: string) => {
    setOpenItems({ ...openItems, [item]: !openItems[item] });
  };

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // const renderMenuItems = (items: any[]) => {
  //   return items.map((item, index) => (
  //     <React.Fragment key={index}>
  //       {item.children ? (
  //         <Accordion
  //           expanded={expanded === item.text}
  //           onChange={handleChange(item.text)}
  //           className="border-none"
  //           elevation={0}
  //           disableGutters
  //         >
  //           <AccordionSummary
  //             expandIcon={<ExpandMoreIcon />}
  //             aria-controls={`${item.text}-content`}
  //             id={`${item.text}-header`}
  //           >
  //             <ListItemIcon>{item.icon}</ListItemIcon>
  //             <Typography>{item.text}</Typography>
  //           </AccordionSummary>
  //           <AccordionDetails>
  //             <List component="div" disablePadding>
  //               {item.children.map((child: any, idx: number) => (
  //                 <ListItem button key={idx}>
  //                   <ListItemIcon>{child.icon}</ListItemIcon>
  //                   <ListItemText primary={child.text} />
  //                 </ListItem>
  //               ))}
  //             </List>
  //           </AccordionDetails>
  //         </Accordion>
  //       ) : (
  //         <ListItem button>
  //           <ListItemIcon>{item.icon}</ListItemIcon>
  //           <ListItemText primary={item.text} />
  //         </ListItem>
  //       )}
  //     </React.Fragment>
  //   ));
  // };

  const renderMenuItems = (items: any[]) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem
          button
          onClick={() => (item.children ? handleClick(item.text) : null)}
          sx={{
            borderRadius: 1.5,
          }}
        >
          <ListItemIcon className="text-xl">{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {item.children ? (
            openItems[item.text] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        {item.children && (
          <Collapse in={openItems[item.text]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="pl-6">
              {renderSubMenuItems(item.children)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  const renderSubMenuItems = (items: any[]) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <Link href={item.route}>
          <ListItem
            button
            className="py-1"
            sx={{
              borderRadius: 1.5,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-gray-300 mr-5"></div>
            <ListItemText primary={item.text} />
            {item.children ? (
              openItems[item.text] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItem>
        </Link>
      </React.Fragment>
    ));
  };

  const drawer = (
    <div className="px-3 pt-7">
      <List>{renderMenuItems(adminMenuItems)}</List>
    </div>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default AdminSidebar;

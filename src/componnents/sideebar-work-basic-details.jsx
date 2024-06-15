import * as React from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function SideebarWorkerDetails() {
  const [state, setState] = React.useState(false);
  const ANCHOR = 'right';

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  return (
    <div>
      <React.Fragment key='right'>
        <Button onClick={toggleDrawer(true)}>details</Button>
        <Drawer anchor={ANCHOR} open={state} onClose={toggleDrawer(false)}>
          <Box sx={{ 'auto': 250 }} role="presentation">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                  <ListItemText primary="name" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><CallIcon /></ListItemIcon>
                  <ListItemText primary="phon" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><MailIcon /></ListItemIcon>
                  <ListItemText primary="email" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText primary="details " />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

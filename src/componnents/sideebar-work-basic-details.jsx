import * as React from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function SideebarWorkerDetails() {
    const [state, setState] = React.useState(false);
    const ANCHOR = 'right';
    const [details_arr, setDetails_arr]=React.useState(['name', 'phon', 'email','details'])
    const [icons_arr, setIcons_arr] = React.useState([<AccountBoxIcon />, <CallIcon />, <AddIcon />, <MailIcon />]);


    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = () => (
        <Box
            sx={{ 'auto': 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {details_arr.map((text, index) => (
                    <>
               
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {icons_arr[index]}
                                {/* {index===0?<AccountBoxIcon/>: index === 1 ? <CallIcon />: index === 3 ? <AddIcon/> :<MailIcon />} */}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </>

                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
                <React.Fragment key='right'>
                    <Button onClick={toggleDrawer(true)}>details</Button>
                    <Drawer
                        anchor={ANCHOR}
                        open={state}
                        onClose={toggleDrawer(false)}
                    >
                        {list()}
                    </Drawer>
                </React.Fragment>

        </div>

    );
}

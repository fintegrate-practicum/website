import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function AnchorTemporaryDrawer() {
    const [state, setState] = React.useState(false

    );

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
                {['name', 'phon', 'email','details'].map((text, index) => (
                    <>
               
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                {index==0?<AccountBoxIcon/>: index == 1 ? <CallIcon />: index == 3 ? <AddIcon/> :<MailIcon />}
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
            {['right'].map((anchor) => (
                <React.Fragment key='right'>
                    <Button onClick={toggleDrawer(true)}>details</Button>
                    <Drawer
                        anchor={anchor}
                        open={state}
                        onClose={toggleDrawer(false)}
                    >
                        {list()}
                    </Drawer>
                </React.Fragment>
            ))}

        </div>

    );
}

import * as React from 'react';
import { Box, Popover, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth0 } from "@auth0/auth0-react";
import {  useNavigate } from "react-router-dom";

interface SidebarUserDetailsProps {
    email: string | undefined;
    nickname: string | undefined;
    user_id: string | undefined;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
}

const SidebarUserDetails: React.FC<SidebarUserDetailsProps> = ({ email, nickname, anchorEl, handleClose }) => {    
    const { logout } = useAuth0();
    const navigate = useNavigate(); 
    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;
    const handleClickProfile = () => {   
        navigate('/editProfile'); 
    }
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                    marginTop: 5.5,
                    borderRadius: 4,
                }
            }}
        >
            <Box sx={{ p: 1, minWidth: 200 }}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={nickname} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={handleClickProfile}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={email} />
                    </ListItem>
                </List>
                <Divider />
                <ListItem button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItem>
            </Box>
        </Popover>
    );
};

export default SidebarUserDetails

import React from "react"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// 


import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';




//
const WorkerPage = () => {
    return (
        <>
            
                <Stack spacing={4} direction="row-reverse" sx={{ color: 'action.active', display: 'flex', justifyContent: 'flex-end', width: '90%',    flexDirection: 'row'}}>
                 
                        <Badge color="secondary" badgeContent={0} showZero>
                            <MailIcon />
                        </Badge>
                   
                    <p >You have update</p>
                </Stack>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '20%', margin: 'auto', flexDirection: 'column' }}>


                <div>
                    <p>name:</p>
                    <p>working position:</p>
                </div>


                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '50%', margin: 'auto', flexDirection: 'column' }}>
                            <ListItemText
                                primary="Personal Information:"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                        {"salary:   ,hsdohcsdhdfhwfwfdsfhsdfjksdbfksd "}

                                    </React.Fragment>
                                }
                            />

                            <ListItemText
                                primary="Employment Details:"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: ' inline-block' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                        {"salary:   ,hsdohcsdhdfhwfwfdsfhsdfjksdbfksd "}
                                    </React.Fragment>
                                }
                            />
                        </div>
                    </ListItem>
                    {/* <Divider variant="inset" component="li" /> */}
                </List >




            </div >
        </>
    )
}
export default WorkerPage




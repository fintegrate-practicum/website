import React from "react"
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const WorkerPage = () => {
    return (
        <>
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

                    <Divider variant="inset" component="li" />

                </List >

                <div>
                    <Button variant="outlined" size="small">
                    Sending a task
                    </Button>
                   
                    <Button variant="outlined" size="small">sending feedback</Button>
                </div>
            </div >





        </>
    )
}
export default WorkerPage




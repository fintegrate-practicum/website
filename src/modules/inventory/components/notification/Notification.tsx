import { FunctionComponent} from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

type NotificationProps = {
    messege: string,
    vertical: 'top'|'bottom',
    horizontal: 'right'|'left'|'center',
}
const Notification: FunctionComponent<NotificationProps> = ({ messege, vertical, horizontal }) => {
    return (
        <Box sx={{ width: 500 }} >
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={true}
                message={messege}
                key={vertical + horizontal}
            />
        </Box>
    );
}

export default Notification;
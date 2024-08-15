import * as React from 'react';
import {
  Box,
  Drawer,
  List,
  Divider,
  Icon,
  Button,
  MenuItem,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useTranslation } from 'react-i18next';

export default function SidebarWorkerDetails() {
  const { t } = useTranslation();
  const [state, setState] = React.useState(false);
  const ANCHOR = 'right';

  const toggleDrawer = (open: boolean) => (event: React.SyntheticEvent) => {
    if (
      event.type === 'keydown' &&
      (event.currentTarget.textContent === 'Tab' ||
        event.currentTarget.textContent === 'Shift')
    ) {
      return;
    }
    setState(open);
  };

  return (
    <>
      <div>
        <React.Fragment key='right'>
          <Button onClick={toggleDrawer(true)} sx={{ auto: 200 }}>
            {t('workers.details')}
          </Button>
          <Drawer anchor={ANCHOR} open={state} onClose={toggleDrawer(false)}>
            <Box sx={{ auto: 250, pointerEvents: 'none' }} role='presentation'>
              <List>
                <MenuItem>
                  <Button>
                    <Icon
                      sx={{
                        padding: '12px ',
                        paddingTop: '2px',
                      }}
                    >
                      <AccountBoxIcon />
                    </Icon>
                    {t('workers.Name')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button>
                    <Icon
                      sx={{
                        padding: '12px',
                        paddingTop: '2px',
                      }}
                    >
                      <CallIcon />
                    </Icon>
                    {t('workers.Phone')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button>
                    <Icon
                      sx={{
                        padding: '12px',
                        paddingTop: '2px',
                      }}
                    >
                      <MailIcon />
                    </Icon>
                    {t('workers.Email')}
                  </Button>
                </MenuItem>
                <MenuItem sx={{ pointerEvents: 'auto', border: 0 }}>
                  <Button>
                    <Icon
                      sx={{
                        padding: '12px',
                        paddingTop: '2px',
                      }}
                    >
                      {' '}
                      <AddIcon />
                    </Icon>
                    {t('workers.Details')}
                  </Button>
                </MenuItem>
                <Divider />
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { RootState } from '../../Redux/store';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { fetchServiceNames, fetchServiceSettingsByServiceName } from '../../Redux/serviceSettingsSlice';
import AddSubCategory, { ServiceSettings } from './Category';

const drawerWidth = 240;

export default function PermanentDrawerRight() {
    const dispatch = useAppDispatch();
    const serviceNames: string[] = useAppSelector((state: RootState) => state.serviceSettingsSlice.serviceNames);
    const [selectedServiceName, setSelectedServiceName] = useState<string | null>('general');
    const [serviceSettings, setServiceSettings] = useState<ServiceSettings | null>(null);

    useEffect(() => {
        dispatch(fetchServiceNames());
    }, [dispatch]);

    useEffect(() => {
        if (selectedServiceName) {
            const fetchSettings = async () => {
                try {
                    const resultAction = await dispatch(fetchServiceSettingsByServiceName(selectedServiceName)).unwrap();
                    console.log(resultAction)
                    setServiceSettings(resultAction);
                } catch (error) {
                    console.error("Failed to fetch service settings:", error);
                }
            };
            fetchSettings();
        }
    }, [dispatch, selectedServiceName]);

    const handleListItemClick = (serviceName: string) => {
        setSelectedServiceName(serviceName);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        boxShadow: 'none', // מסיר את המסגרת
                    },
                }}
                variant="permanent"
                anchor="right"
            >
                <Toolbar />
                <Divider />
                <List>
                    {serviceNames.map((serviceName, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                onClick={() => handleListItemClick(serviceName)}
                                sx={{
                                    backgroundColor: selectedServiceName === serviceName ? '#f5f5f5' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: selectedServiceName === serviceName ? '#e0e0e0' : '#f5f5f5',
                                    },
                                }}
                            >
                                <ListItemText primary={serviceName} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <main style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {serviceSettings && serviceSettings.settings_json.map((item, index) => (
                    <AddSubCategory key={index} {...item} />
                ))}

            </main>
        </div>
    );
}

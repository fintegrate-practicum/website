import { useState } from 'react';
import menuItem from '../menu/types';
import { Home, Settings, Person, AdminPanelSettings } from '@mui/icons-material';
import SideMenu from '../menu/SideMenu';
import LazyRouter from '../router/lazyRouter';
import Header from '../Header/Header';

const MainRouter = () => {
    const menuItems = [
        {
          name: 'homePage',
          nameToView: 'HomePage',
          icon: Home,
          route: '../HomePage/homePage',
        },
        {
          name: 'settings',
          nameToView: 'Settings',
          icon: Settings,
          route: '../Setting/Category',
        },
        {
          name: 'worker',
          nameToView: 'Worker',
          icon: Person,
          route: '../router/WorkersRouter',
        }
    ];

    if(true){//if the user is manager
        menuItems.push({
            name: 'manager',
            nameToView: 'Manager',
            icon: AdminPanelSettings,
            route: '../router/ManagerRouter',
        })
    }

    const [currentMenu, setCurrentMenu] = useState<menuItem>(menuItems[0]);

    return (
        <>
            <Header serviceName={currentMenu?.nameToView}><div></div></Header>
            <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
            <LazyRouter currentRoute={currentMenu?.route || ' '} />
        </>
    )
}

export default MainRouter;
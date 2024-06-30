import { useEffect, useState } from 'react';
import menuItem from '../menu/types';
import { Home, Settings, Person, AdminPanelSettings, Height } from '@mui/icons-material';
import SideMenu from '../menu/SideMenu';
import LazyRouter from '../router/lazyRouter';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';

const MainRouter = () => {

    const location = useLocation();

    const menuItems = [
        {
          name: 'homePage',
          nameToView: 'HomePage',
          icon: Home,
          route: '../HomePage',
          component: '../HomePage/homePage'
        },
        {
          name: 'settings',
          nameToView: 'Settings',
          icon: Settings,
          route: '../Setting/Category',
          component: '../Setting/Category'
        },
        {
          name: 'worker',
          nameToView: 'Worker',
          icon: Person,
          route: '../Worker/details',
          component: '../navigation/Workers'
        }
    ];

    if(true){//if the user is manager
        menuItems.push({
            name: 'manager',
            nameToView: 'Manager',
            icon: AdminPanelSettings,
            route: '../Manager',
            component: '../router/ManagerRouter'
        })
    }

    const [currentMenu, setCurrentMenu] = useState<menuItem>(menuItems[0]);

    useEffect(() => {
      if(location.pathname == '/Setting/Category'){
        setCurrentMenu(menuItems[1])
      }
      else if(location.pathname == '/Worker'){
        setCurrentMenu(menuItems[2])
      }
      else if(location.pathname == '/Worker/details'){
        setCurrentMenu(menuItems[2])
      }
      else if(location.pathname == '/Worker/tasks'){
        setCurrentMenu(menuItems[2])
      }
      else if(location.pathname == '/Worker/messages'){
        setCurrentMenu(menuItems[2])
      }
      else if(location.pathname == '/router/ManagerRouter'){//and if the user is manager
        setCurrentMenu(menuItems[3])
      }
    }, [])

    
    return (
        <>
            <Header serviceName={currentMenu?.nameToView}><div></div></Header>
            <div style={{height: "25vh"}}></div>
            <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
            <LazyRouter currentRoute={currentMenu?.component || ' '} />
        </>
    )
}

export default MainRouter;
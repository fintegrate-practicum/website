import { useState } from 'react';
import menuItem from '../menu/types';
import { List, Home } from '@mui/icons-material';
import SideMenu from '../menu/SideMenu';
import LazyRouter from '../router/lazyRouter';
import Header from '../Header/Header';

const ManagerRouter = () => {
        const managerItem: menuItem[] = [
        {
            name: 'homePage',
            nameToView: 'HomePage',
            icon: Home,
            route: '../router/MainRouter',
        },{
            name: 'WorkersList',
            nameToView: 'Workers List',
            icon: List,
            route: '../workers/workersShowList',
        }
    ]

    const [managerMenu, setManagerMenu] = useState<menuItem>(managerItem[1]);

    return (
        <>
            <Header serviceName={managerMenu?.nameToView}><div></div></Header>
            <SideMenu items={managerItem} setCurrentMenu={setManagerMenu} />
            <LazyRouter currentRoute={managerMenu?.route || ' '} />
        </>
    )
}

export default ManagerRouter;
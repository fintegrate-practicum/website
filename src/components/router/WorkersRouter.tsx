import { useState } from 'react';
import menuItem from '../menu/types';
import { TaskAlt, Message, AccountCircle, Home } from '@mui/icons-material';
import SideMenu from '../menu/SideMenu';
import LazyRouter from '../router/lazyRouter';
import Header from '../Header/Header';

const WorkersRouter = () => {
        const workersItem: menuItem[] = [
        {
            name: 'homePage',
            nameToView: 'HomePage',
            icon: Home,
            route: '../router/MainRouter',
        },{
            name: 'Worker Page',
            nameToView: 'Worker Details',
            icon: AccountCircle,
            route: '../workers/workerPage',
        },{
            name: 'WorkerTasksList',
            nameToView: 'Worker Tasks',
            icon: TaskAlt,
            route: '../workers/tasks/tasksShowList',
        },{
            name: 'WorkerMessagesList',
            nameToView: 'Worker Messages',
            icon: Message,
            route: '../workers/messageList',
        }
    ]

    const [workersMenu, setWorkersMenu] = useState<menuItem>(workersItem[1]);

    return (
        <>
            <Header serviceName={workersMenu?.nameToView}><div></div></Header>
            <SideMenu items={workersItem} setCurrentMenu={setWorkersMenu} />
            <LazyRouter currentRoute={workersMenu?.route || ' '} />
        </>
    )
}

export default WorkersRouter;
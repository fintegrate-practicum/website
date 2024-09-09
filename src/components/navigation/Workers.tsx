import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import React, { useEffect, useState } from 'react';
import Task from '../../modules/workers/classes/task';
import { fetchMessages } from '../../modules/workers/features/messageSlice';
import Box from '@mui/material/Box';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import WorkerPage from '../../modules/workers/components/workerPage';
import TasksShowList from '../../modules/workers/components/tasks/tasksShowList';
import MessageList from '../../modules/workers/components/messageList';
import Tab from '@mui/material/Tab';
import { fetchTasks } from '../../modules/workers/features/taskSlice';
import { useTranslation } from 'react-i18next';

const WorkersTopNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const tasks = useAppSelector((state) => state.taskSlice.tasks);
  const messages = useAppSelector((state) => state.messageSlice.messages);
  const currentUser = useAppSelector(
    (state) => state.currentUserSlice.userDetails,
  );
  const currentEmployee = useAppSelector(
    (state) => state.currentUserSlice.employeeDetails,
  );

  const dispatch = useAppDispatch();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [value, setValue] = useState(location.pathname.slice(8));

  useEffect(() => {
    setValue(location.pathname.slice(8));

    // if (currentUser && currentUser.auth0_user_id) {
    dispatch(fetchMessages(currentUser.auth0_user_id));
    dispatch(
      fetchTasks({
        employeeId: currentEmployee.id_user,
        businessId: currentEmployee.businessId,
      }),
    );
    // }
  }, [currentUser, dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='workers tabs'>
            <Tab label={t('website.details')} value='details' href='details' />
            <Tab label={t('website.tasks')} value='tasks' href='tasks' />
            <Tab
              label={t('website.messages')}
              value='messages'
              href='messages'
            />
          </TabList>
        </Box>
        <TabPanel value='details'>
          <WorkerPage user={currentUser} employee={currentEmployee} />
        </TabPanel>
        <TabPanel value='tasks'>
          <TasksShowList
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
          />
        </TabPanel>
        <TabPanel value='messages'>
          <MessageList messages={messages} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default WorkersTopNav;

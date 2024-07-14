import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import WorkerPage from '../../modules/workers/components/workerPage';
import TasksShowList from '../../modules/workers/components/tasks/tasksShowList';
import User from '../../modules/workers/classes/user';
import employee from '../../modules/workers/classes/employee';
import MessageList from '../../modules/workers/components/messageList';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Task from '../../modules/workers/classes/task';

const WorkersTopNav = () => {

  const location = useLocation();
    
  const [value, setValue] = useState(location.pathname.slice(8));

  useEffect(() => {
    setValue(location.pathname.slice(8))
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="workers tabs">
            <Tab label="details" value="details" href='details'/>
            <Tab label="tasks" value="tasks" href='tasks' />
            <Tab label="messages" value="messages" href='messages'/>
          </TabList>
        </Box>
        <TabPanel value="details"><WorkerPage user={new User} employee={new employee}/></TabPanel>
        <TabPanel value="tasks"><TasksShowList filteredTasks={[]} setFilteredTasks={function (value: React.SetStateAction<Task[]>): void {
          throw new Error('Function not implemented.');
        } }/></TabPanel>
        <TabPanel value="messages"><MessageList messages={[]}/></TabPanel>
      </TabContext>
    </Box>
  );
}

export default WorkersTopNav
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Task from '../../../../classes/task';

interface SearchTaskProps {
  tasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SearchTask: React.FC<SearchTaskProps> = ({ tasks, setFilteredTasks }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setFilteredTasks(tasks.filter(task => {
      return task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.employee.some(emp =>
          emp.toString().includes(searchTerm.toLowerCase())) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
    }))
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch();
          }
          }
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </>

  );
}
export default SearchTask;
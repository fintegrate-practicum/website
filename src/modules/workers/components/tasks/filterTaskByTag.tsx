import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Task from '../../classes/task';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@mui/material/Autocomplete';

interface FilterTasksByTagProps {
  tasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const FilterTasksByTag: React.FC<FilterTasksByTagProps> = ({
  tasks,
  setFilteredTasks,
}) => {
  const { t } = useTranslation();
  const [filterTerm, setFilterTerm] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const handleFilter = () => {
    setFilteredTasks(
      tasks.filter((task) => {
        return task.tags?.some((tag) =>
          tag.toLowerCase().includes(filterTerm.toLowerCase()),
        );
      }),
    );
  };

  const handleSuggestTags = (inputValue: string) => {
    const filteredTags = tasks.reduce((acc: string[], task) => {
      task.tags?.forEach((tag) => {
        if (
          tag.toLowerCase().startsWith(inputValue.toLowerCase()) &&
          !acc.includes(tag)
        ) {
          acc.push(tag);
        }
      });
      return acc;
    }, []);

    setSuggestedTags(filteredTags);
  };

  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <Autocomplete
        freeSolo
        options={suggestedTags}
        renderInput={(params) => (
          <InputBase
            {...params}
            sx={{ ml: 1, flex: 1 }}
            placeholder={t('workers.Filter')}
            inputProps={{ ...params.inputProps, 'aria-label': 'filter' }}
            value={filterTerm}
            onChange={(e) => {
              const inputValue = e.target.value;
              setFilterTerm(inputValue);
              handleFilter();
              handleSuggestTags(inputValue);
            }}
          />
        )}
      />
      <IconButton
        type='button'
        sx={{ p: '10px' }}
        aria-label='filter'
        onClick={handleFilter}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default FilterTasksByTag;

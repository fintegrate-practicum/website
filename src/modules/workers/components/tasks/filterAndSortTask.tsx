import React, { useEffect } from 'react';
import Task from '../../classes/task';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SearchTaskProps {
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SortAndFilterTasks: React.FC<SearchTaskProps> = ({ filteredTasks, setFilteredTasks }) => {
  const { t } = useTranslation();

  const [alignment, setAlignment] = React.useState('');
  const [checked, setChecked] = React.useState(true);
  
  const handleChangeAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (checked) {
      setAlignment(newAlignment);
    }
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    let tasks = [...filteredTasks];
    if (alignment === "Name") {
      tasks = tasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
    } else if (alignment === "Date") {
      tasks = tasks.sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
    } else if (alignment === "Urgency") {
      tasks = tasks.sort((a, b) => a.urgency - b.urgency);
    }
    setFilteredTasks(tasks);
  }, [alignment]);

  return (
    <>
      <FormControlLabel
        control={<Switch onChange={handleChangeChecked} name="jason" />}
        label={t('workers.workers.Filter By')}
      />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChangeAlignment}
        aria-label="Platform"
      >
        <ToggleButton value="Date">{t('workers.Date')}</ToggleButton>
        <ToggleButton value="Urgency">{t('workers.Urgency')}</ToggleButton>
        <ToggleButton value="Name">{t('workers.Name')}</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default SortAndFilterTasks;

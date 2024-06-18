import { FC, createElement, ReactElement } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

export enum ComponentType {
  Button = 'Button',
  ButtonGroup = 'ButtonGroup',
  Checkbox = 'Checkbox',
  FloatingActionButton = 'FloatingActionButton',
  RadioGroup = 'RadioGroup',
  Rating = 'Rating',
  Select = 'Select',
  Slider = 'Slider',
  Switch = 'Switch',
  TextField = 'TextField',
  MenuItem = 'MenuItem',
  Input = 'Input', // הוספת סוג רכיב חדש
}

export interface MySettingProps {
  setting: {
    settingDesc: string;
    type: ComponentType;
    props?: Record<string, any>;
    children?: any;
  };
}

const componentMap: {
  [key in ComponentType]: React.ComponentType<any> | string;
} = {
  [ComponentType.Button]: Button,
  [ComponentType.ButtonGroup]: ButtonGroup,
  [ComponentType.Checkbox]: Checkbox,
  [ComponentType.FloatingActionButton]: Fab,
  [ComponentType.RadioGroup]: RadioGroup,
  [ComponentType.Rating]: Rating,
  [ComponentType.Select]: Select,
  [ComponentType.Slider]: Slider,
  [ComponentType.Switch]: Switch,
  [ComponentType.TextField]: TextField,
  [ComponentType.MenuItem]: MenuItem,
  [ComponentType.Input]: 'input', // כל ה-input של React
};

const MySetting: FC<MySettingProps> = (props) => {
  const { setting } = props;

  if (!setting) {
    return null;
  }

  const Component = componentMap[setting.type];

  if (!setting.type || !Component) {
    return null;
  }

  let children: ReactElement | ReactElement[] | undefined;
  if (setting.type === ComponentType.Select && Array.isArray(setting.children)) {
    children = setting.children.map((child: { key: string; value: string; string: string }) => (
      <MenuItem key={child.key} value={child.value}>
        {child.string}
      </MenuItem>
    ));
  } else if (setting.type === ComponentType.RadioGroup && Array.isArray(setting.children)) {
    children = setting.children.map((child: { value: string; label: string }) => (
      <FormControlLabel
        key={child.value}
        value={child.value}
        control={<Radio />}
        label={child.label}
      />
    ));
  } else if (setting.type === ComponentType.ButtonGroup && Array.isArray(setting.children)) {
    children = setting.children.map((child: { key: string; value: string }) => (
      <Button key={child.key} variant={setting.props?.variant}>
        {child.value}
      </Button>
    ));
  } else if (setting.type === ComponentType.FloatingActionButton && typeof setting.children === 'string') {
    children = createElement('span', null, setting.children);
  } else {
    children = setting.children;
  }

  return createElement(Component, setting.props, children);
};


export default MySetting;

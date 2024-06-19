import { FC, createElement } from 'react';
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
  Input = 'Input', // הוספת סוג רכיב חדש


}

export interface MySettingProps {
  setting: {
    settingDesc : string
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
  [ComponentType.Input]: 'input', // כל  הinput  של ריאקט
}

const MySetting: FC<MySettingProps> = (props) => {
  const { setting } = props;

  // הוספת תנאי לבדיקה אם 'setting' מוגדר
  if (!setting) {
    return null;
  }

  const Component = componentMap[setting.type];

  // הוספת תנאי נוסף לבדיקה שהמאפיין 'type' מוגדר
  if (!setting.type || !componentMap[setting.type]) {
    return null;
  }

  return createElement(Component, setting.props, setting.children);
};


export default MySetting;


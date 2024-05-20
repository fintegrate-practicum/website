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

export enum ButtonType {
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

}

interface MyComponentProps {
  setting: {
    settingDesc : string
    type: ButtonType;
    props?: Record<string, any>;
    children?: any;
  };
}

const componentMap: {
  [key in ButtonType]: React.ComponentType<any>;
} = {
  [ButtonType.Button]: Button,
  [ButtonType.ButtonGroup]: ButtonGroup,
  [ButtonType.Checkbox]: Checkbox,
  [ButtonType.FloatingActionButton]: Fab,
  [ButtonType.RadioGroup]: RadioGroup,
  [ButtonType.Rating]: Rating,
  [ButtonType.Select]: Select,
  [ButtonType.Slider]: Slider,
  [ButtonType.Switch]: Switch,
  [ButtonType.TextField]: TextField,
};

const MyComponent: FC<MyComponentProps> = (props) => {
  const { setting } = props;
  const Component = componentMap[setting.type];

  if (!Component) {
    return null; // או הציגו הודעת שגיאה
  }

  return createElement(Component, setting.props, setting.children);
};

export default MyComponent;


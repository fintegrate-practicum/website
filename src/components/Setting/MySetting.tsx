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
import TextField from '../../common/component/TextField/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { saveServiceSettings } from '../../Redux/serviceConfigurationsSlice';
import { useAppDispatch } from '../../Redux/hooks';

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
  Input = 'Input',
}

interface Setting {
  key: string;
  value: any;
}

export interface ButtonChildren {
  children: string;
}

export interface ButtonGroupChildren {
  children: { key: string; value: string }[];
}

export interface SelectChildren {
  children: { key: string; value: string; text: string }[];
}

export interface RadioGroupChildren {
  children: { value: string; label: string }[];
}

export interface FloatingActionButtonChildren {
  children: string;
}

interface CustomChild {
  key?: string;
  value?: string;
  text?: string;
  label?: string;
}

export interface MySettingProps {
  setting: {
    categoryName: string;
    serviceName: string;
    settingDesc: string;
    type: ComponentType;
    props?: Record<string, any>;
    children?:
      | CustomChild[]
      | CustomChild
      | RadioGroupChildren
      | SelectChildren
      | ButtonGroupChildren
      | ButtonChildren
      | FloatingActionButtonChildren
      | string;
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
  [ComponentType.Input]: 'input',
};

const MySetting: FC<MySettingProps> = (props) => {
  const { setting } = props;
  const dispatch = useAppDispatch();

  const handleChange = (key: string, value: any) => {
    const updatedSetting: Setting = { key, value };
    dispatch(
      saveServiceSettings({
        serviceName: setting.serviceName,
        settings: [updatedSetting],
      }),
    );
  };

  if (!setting) {
    return null;
  }

  const Component = componentMap[setting.type];

  if (!setting.type || !Component) {
    return null;
  }

  let children: ReactElement | ReactElement[] | undefined | any;
  if (
    setting.type === ComponentType.Select &&
    Array.isArray(setting.children)
  ) {
    children = (setting.children as CustomChild[]).map((child, index) => (
      <MenuItem key={index} value={child.value}>
        {child.text}
      </MenuItem>
    ));
  } else if (
    setting.type === ComponentType.RadioGroup &&
    Array.isArray(setting.children)
  ) {
    children = setting.children.map((child, index) => (
      <FormControlLabel
        key={index}
        value={child.value}
        control={<Radio />}
        label={child.label}
      />
    ));
  } else if (
    setting.type === ComponentType.ButtonGroup &&
    Array.isArray(setting.children)
  ) {
    children = setting.children.map((child, index) => (
      <Button key={index} variant={setting.props?.variant}>
        {child.value}
      </Button>
    ));
  } else if (
    (setting.type === ComponentType.FloatingActionButton ||
      setting.type === ComponentType.Button) &&
    typeof setting.children === 'string'
  ) {
    children = createElement('span', null, setting.children);
  } else if (
    setting.type === ComponentType.Input &&
    typeof setting.children === 'string'
  ) {
    children = createElement('span', null, setting.children);
  } else {
    children = setting.children;
  }

  return createElement(
    Component,
    {
      ...setting.props,
      onChange: (event: any) =>
        handleChange(
          `${setting.categoryName} -> ${setting.settingDesc}`,
          event.target.value,
        ),
    },
    children,
  );
};

export default MySetting;

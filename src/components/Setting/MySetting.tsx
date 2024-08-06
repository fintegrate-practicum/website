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
	Input = 'Input',
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

function validateChildrenType(type: ComponentType, children: any): boolean {
	switch (type) {
		case ComponentType.Button:
		case ComponentType.FloatingActionButton:
			return typeof children === 'string';
		case ComponentType.ButtonGroup:
			return (
				Array.isArray(children) &&
				children.every(
					(child) =>
						typeof child === 'object' && 'key' in child && 'value' in child,
				)
			);
		case ComponentType.RadioGroup:
			return (
				Array.isArray(children) &&
				children.every(
					(child) =>
						typeof child === 'object' && 'value' in child && 'label' in child,
				)
			);
		case ComponentType.Select:
			return (
				Array.isArray(children) &&
				children.every(
					(child) =>
						typeof child === 'object' &&
						'key' in child &&
						'value' in child &&
						'text' in child,
				)
			);

		default:
			return !children;
	}
}

const MySetting: FC<MySettingProps> = (props) => {
	const { setting } = props;

	if (!setting) {
		return null;
	}

	const Component = componentMap[setting.type];

	if (!setting.type || !Component) {
		return null;
	}

	// if (!validateChildrenType(setting.type, setting.children)) {
	//   throw new Error(`Invalid children for component type: ${setting.type}`);
	// }

	let children: ReactElement | ReactElement[] | undefined | any;
	if (
		setting.type === ComponentType.Select &&
		Array.isArray(setting.children)
	) {
		children = (setting.children as CustomChild[]).map((child) => (
			<MenuItem key={child.key} value={child.value}>
				{child.text}
			</MenuItem>
		));
	} else if (
		setting.type === ComponentType.RadioGroup &&
		Array.isArray(setting.children)
	) {
		children = setting.children.map((child) => (
			<FormControlLabel
				key={child.value}
				value={child.value}
				control={<Radio />}
				label={child.label}
			/>
		));
	} else if (
		setting.type === ComponentType.ButtonGroup &&
		Array.isArray(setting.children)
	) {
		children = setting.children.map((child) => (
			<Button key={child.key} variant={setting.props?.variant}>
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

	return createElement(Component, setting.props, children);
};

export default MySetting;

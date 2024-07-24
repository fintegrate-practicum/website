import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import theme from '../../../Theme';
import Button from './Button';

const meta = {
    component: Button,
    tags: ['autodocs'],
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

const baseProps = {
    borderColor: theme.palette.primary.dark,
    border: "double",
    outlineColor: theme.palette.info.main,
    color: theme.palette.secondary.dark,
};

export const fullColor: Story = {
    args: {
        onClick: action('onClick'),
        backgroundColor: theme.palette.secondary.dark,
        value: "Button",
        isLink: false,
        ...baseProps,
    },
};

export const empty: Story = {
    args: {
        onClick: () => {
            window.location.href = 'https://www.example.com';
        },
        value: "Button",
        backgroundColor: "white",
        isLink: false,
        ...baseProps,
    },
};

export const link: Story = {
    args: {
        value: "Button",
        backgroundColor: "white",
        isLink: true,
        ...baseProps,
    },
};
import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../../src/Theme';
import Button from './Button';

const meta = {
    component: Button,
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const fullColor: Story = {
    args: {
        onClickFunction: () => {
            console.log("Button clicked");
        },
        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.primary.dark,
        border: "double",
        outlineColor: theme.palette.info.main,
        color: theme.palette.info.main,
        value: "Button",
        isLink: false,
     
    },

};
export const empty: Story = {
    args: {
        onClickFunction: () => {
            console.log("Button clicked");
        },
        value: "Button",
        backgroundColor: "white",
        borderColor: theme.palette.primary.dark,
        border:"double",
        outlineColor: theme.palette.info.main,
        color: theme.palette.secondary.dark,
        isLink:false
    },

};
export const link: Story = {
    args: {
        value: "Button",
        backgroundColor: "white",
        borderColor: theme.palette.primary.dark,
        border:"double",
        outlineColor: theme.palette.info.main,
        color: theme.palette.secondary.dark,
        isLink:true
    },

};

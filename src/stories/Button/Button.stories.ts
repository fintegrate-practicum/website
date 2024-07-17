import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../src/Theme';
import Button from './Button1';

const meta = {
    component: Button,
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const fullColor: Story = {
    args: {
        //stories אפשר להוסיף עוד פרמטרים ועוד

        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.info.main,
        outlineColor: theme.palette.info.main,
        color: theme.palette.info.main,
        value: "Button"
    },

};
export const empty: Story = {
    args: {
        //stories אפשר להוסיף עוד פרמטרים ועוד
        value: "Button",
        backgroundColor: "white",
        borderColor: "black",
        outlineColor: theme.palette.info.main,
        color: theme.palette.secondary.dark
    },

};
export const link: Story = {
    args: {
      
        value: "Button",
      
        borderBottomColor:theme.palette.secondary.dark,
        outlineColor: theme.palette.secondary.dark,
        color: theme.palette.info.main
    },

};

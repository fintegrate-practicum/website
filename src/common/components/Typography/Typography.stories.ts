import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import theme from '../../../Theme';
import Typography from './Typography';


const meta = {
    component: Typography,
    tags: ['autodocs'],
} as Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

const baseProps = {
    variant: "h2",
    children: "Typography",
    component: "h2",
    gutterBottom: true,
    paragraph: true,
    align: 'center',
    color: theme.palette.secondary.light,
    fontFamily: '"Segoe UI"',
    fontWeight: "bold"   

};

export const Header: Story = {
    args: {
        ...baseProps,
       

    },
};

export const Button: Story = {
    args: {
        ...baseProps,
        variant: "button",
        color: theme.palette.info.main,

    },
};

export const CommonText: Story = {
    args: {
        ...baseProps,
        variant: "body1",
        color: theme.palette.primary.light,


    },
};

export const subTitle: Story = {
    args: {
        ...baseProps,
        variant: "subtitle1",
       
      
      


    },
};


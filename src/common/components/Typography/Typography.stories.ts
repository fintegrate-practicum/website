import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import theme from '../../../Theme';
import Typography from './Typography';


const meta = {
    component: Typography ,
    tags: ['autodocs'],
} as Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

const baseProps = {
    variant: "h2",
    children: "Typography",
    component: "div",
    gutterBottom: true,
    align: 'center',
    color: "primary",
    fontWeight: "bold"   

};

export const Header: Story = {
    args: {
        ...baseProps,
       

    },
};
export const CommonText: Story = {
    args: {
        ...baseProps,
        variant: "body1",
        color: "secondary",


    },
};

export const subTitle: Story = {
    args: {
        ...baseProps,
        variant: "subtitle1",
        color: "success",
       
      
      


    },
};


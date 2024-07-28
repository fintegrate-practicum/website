
import type { Meta, Story, StoryObj } from '@storybook/react';
import TextField from './TextField';
const meta: Meta<typeof TextField> = {
    component: TextField,
    title: 'Components/TextField',
    tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const primary: Story = {
    args: {
        label: "Enter text:",
        value: "",
        onChange: (value: string) => console.log(value),
    },
};

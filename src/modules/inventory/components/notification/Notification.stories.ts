import type { Meta, StoryObj } from '@storybook/react';
import Notification from './Notification';

const meta = {
    component: Notification,
    tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof Notification>;

export const primary: Story = {
    args: {
        //stories אפשר להוסיף עוד פרמטרים ועוד 
        messege: "notification!",
        vertical: "top",
        horizontal: "center"
    },
};
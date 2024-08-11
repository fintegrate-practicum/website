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
  disabled: false,
  isLink: false,
  children: 'Button',
  onClick: action('onClick'),
};

export const fullColor: Story = {
  args: {
    ...baseProps,
  },
};

export const empty: Story = {
  args: {
    ...baseProps,
    onClick: () => {
      window.location.href = 'https://www.example.com';
    },
    variant: 'outlined',
    color: 'secondary',
  },
};

export const link: Story = {
  args: {
    ...baseProps,
    color: 'info',
    isLink: true,
    href: 'https://chat.yishreylev.net/',
  },
};

import React from 'react';
import { Story, Meta } from '@storybook/react';
import Img from './img';

export default {
  title: 'Img',
  component: Img,
} as Meta;

const Template: Story = (args) => <Img {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://example.com/image.jpg',
  alt: 'Example Image',
};
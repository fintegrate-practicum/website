import { render } from '@testing-library/react';
import Typography from './Typography';

test('renders Typography component with default props', () => {
  const { getByText } = render(<Typography>Hello World</Typography>);
  const typographyElement = getByText('Hello World');
  expect(typographyElement).toBeInTheDocument();
});

test('renders Typography component with variant "h2"', () => {
  const { getByText } = render(<Typography variant="h2">Heading 2</Typography>);
  const headingElement = getByText('Heading 2');
  expect(headingElement).toBeInTheDocument();
});
test('renders Typography component as a Common text', () => {
  const { getByText } = render(<Typography variant="body1">Primary Text</Typography>);
  const primaryElement = getByText('Primary Text');
  expect(primaryElement).toBeInTheDocument();
});

test('renders Typography component with variant "subtitle1"', () => {
  const { getByText } = render(<Typography variant="subtitle1">Sub Title</Typography>);
  const subTitleElement = getByText('Sub Title');
  expect(subTitleElement).toBeInTheDocument();
});
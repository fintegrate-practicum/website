import { Preview  } from "@storybook/react";
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from '@mui/material';
import  theme  from '../src/Theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({themes:{theme},
      Provider: ThemeProvider,
   }),
 ],
};

export default preview;









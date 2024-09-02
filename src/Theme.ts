// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#6503A6',
//       dark: '#380273',
//     },
//     secondary: {
//       main: '#F2CB05',
//       dark: '#F2B704',
//     },
//     info: {
//       main: '#4F5902',
//     },
//   },
// });

// export default theme;
import { createTheme } from '@mui/material/styles';

const theme = (direction: any) => createTheme({
  direction, // הגדרת כיוון כ-RTL או LTR
  palette: {
    primary: {
      main: '#6503A6',
      dark: '#380273',
    },
    secondary: {
      main: '#F2CB05',
      dark: '#F2B704',
    },
    info: {
      main: '#4F5902',
    },
  },
});

export default theme;

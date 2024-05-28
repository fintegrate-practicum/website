// import { ThemeProvider } from '@mui/material/styles';
// import { Provider } from 'react-redux';
// import { useState } from 'react';
// import './App.css';
// import { Store } from './Redux/Store';
// import Header  from './components/Header/Header';
// import Definition from './components/Definitions/Definition';
// import theme from './Theme';
// import Checkbox from '@mui/material/Checkbox';
// import GenericComponent from './components/GenericComponent';
// import Button from '@mui/material/Button';
// import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
// import { Rating } from '@mui/material';
// import { Slider } from '@mui/material';
// import { Switch } from '@mui/material';
// import Typography from '@mui/material/Typography';

// // import { TransferList, ListItem } from '@mui/material';

// import { CheckboxProps } from '@mui/material/Checkbox';
// import  { SwitchProps } from '@mui/material/Switch';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// import MySetting from './components/MySetting'
// function App() {
//   // enum ComponentType {
//   //   Button = 'Button',
//   //   ButtonGroup = 'Button Group',
//   //   Checkbox = 'Checkbox',
//   //   FloatingActionButton = 'Floating Action Button',
//   //   RadioGroup = 'Radio Group',
//   //   Rating = 'Rating',
//   //   Select = 'Select',
//   //   Slider = 'Slider',
//   //   Switch = 'Switch',
//   //   TextField = 'Text Field',
//   //   TransferList = 'Transfer List',
//   // }
  
// // interface DefinitionProps {
// //     definitionItem: {
// //         DefinitionDesc: string;
// //         Option: string;
// //         Attribute?: string[];
// //         ComponentType: ComponentType;
// //     };
// // }
// // const definitionItem: DefinitionProps['definitionItem'] = {
// //   DefinitionDesc: 'Button Definition',
// //   Option: 'Option 1',
// //   Attribute: ['defaultChecked'],
// //   ComponentType: ComponentType[`Button`]
// // };


// enum ComponentType {
//   Button = 'Button',
//   Checkbox = 'Checkbox',
//   Switch = 'Switch',
//   // הוסיפו כאן את שאר סוגי הרכיבים
// }

// interface MySettingProps {
//   setting: {
//     type: ComponentType;
//     props?: Record<string, any>;
//     children?: any;
//   };
// }

// // הגדרת מפה עם סוגי הרכיבים וסוגי הפרופס המתאימים להם
// const componentMap: {
//   [key in ComponentType]: React.ComponentType<any>;
// } = {
//   [ComponentType.Button]: Button,
//   [ComponentType.Checkbox]: Checkbox,
//   [ComponentType.Switch]: Switch,
//   // הוסיפו כאן את שאר הרכיבים
// };
// const [checked, setChecked] = useState(false);
// // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setChecked(event.target.checked);


//   // const label = { text: 'Example Label' };
// };
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <Provider store={Store}>
//         {/* <input type="color"/>
//         <GenericComponent component="input" type="color" />
//         {/* <Definition definitionItem={definitionItem} /> */}

//         {/* עובד! */}
//         {/* <GenericComponent component={Button}>Button Example</GenericComponent> */}
// {/* עובד! */}
//        {/* <GenericComponent component={Select} defaultValue="option1"> */}
//           {/* הוספת אפשרויות לתיבת הבחירה */}
//             {/* <MenuItem value="option1">Option 1</MenuItem>
//           <MenuItem value="option2">Option 2</MenuItem>
//           <MenuItem value="option3">Option 3</MenuItem>
//         </GenericComponent>   */}

// {/* //לא עובד!! */}
// {/* <Checkbox {...label} /> */}
// {/* <Checkbox  />
// <GenericComponent component={Checkbox} /> */}
// {/* <GenericComponent component={Checkbox} checked={checked} onChange={handleChange}>
//         בחירה
//       </GenericComponent> */}
//       {/* <GenericComponent component={Checkbox}>
//   <Typography>My Checkbox</Typography>
// </GenericComponent> */}


// {/* עובד! */}
//       {/* <GenericComponent component={RadioGroup}>
//         <FormControlLabel value="female" control={<Radio />} label="Female" />
//         <FormControlLabel value="male" control={<Radio />} label="Male" />
//       </GenericComponent> */}

// {/* //לא עובד!! */}
//       {/* <GenericComponent component={Slider} defaultValue={30} /> */}
    

// {/* //לא עובד!! */}
//       {/* <GenericComponent component={Switch} defaultChecked /> */}
//       {/* <GenericComponent component={Switch} defaultChecked={true} />
//       <GenericComponent component={Switch}  />  */}



//       <div>
//       <h1>App Component</h1>
//       {/* שולחים לרכיב MySetting את הרכיב Switch עם הפרופסים */}
//       <MySetting
//         setting={{
//           type: ComponentType.Switch,
//           props: { checked: true },
//         }}
//       />
//       <MySetting
//         setting={{
//           type: ComponentType.Checkbox,
//           props: { disabled: true },
//         }}
//       />
//       <MySetting
//         setting={{
//           type: ComponentType.Button,
//           props: { variant: 'contained' },
//           children: 'Contained',
//         }}
//       />



//     </div>
//         </Provider>
//       </ThemeProvider>
//     </>
//   )
// }
// export default App


// import { useState } from 'react';
// import MySetting from './components/MySetting';
// import { ComponentType } from './components/MySetting';

// const App = () => {
//   const [checked, setChecked] = useState(true);
//   const [disabled, setDisabled] = useState(false);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//   };

//   const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     <div>
//       <MySetting
//         setting={{
//           type: ComponentType.Switch,
//           props: { checked: checked, onChange: handleSwitchChange },
//         }}
//       />
//       <MySetting
//         setting={{
//           type: ComponentType.Checkbox,
//           props: { checked: checked, onChange: handleCheckboxChange, disabled: disabled },
//         }}
//       />
//       <MySetting
//         setting={{
//           type: ComponentType.Button,
//           props: { variant: 'contained', onClick: () => setDisabled(!disabled) },
//           children: 'Toggle Disabled',
//         }}
//       />
//     </div>
//   );
// };

// export default App;


import { useState } from 'react';

import MySetting, { ComponentType } from './components/Setting/MySetting';
import { Button, ButtonGroup, Checkbox  ,FormControlLabel,
  RadioGroup, Fab, Radio, Rating, Select, MenuItem, Slider, Switch, TextField } from '@mui/material';
import Header from './components/Header/Header';

const App = () => {
  const [checked, setChecked] = useState(true);
  const [ratingValue, setRatingValue] = useState<number | null>(2);
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [selectedValue, setSelectedValue] = useState('');

 
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectedValue(event.target.value);
  };
  
  return (
    <div>
     
      {/* עובד  */}
      <MySetting
        setting={{
          settingDesc : "stringDefinitionDesc",
          type: ComponentType.Button,
          props: { variant: 'contained' },
          children: 'Contained Button',
        }}
      />
      {/* עובד
      <MySetting
        setting={{
             settingDesc : "stringDefinitionDesc",
          type: ComponentType.ButtonGroup,
          props: { variant: 'contained' },
          children: [
            <Button key="one">One</Button>,
            <Button key="two">Two</Button>,
            <Button key="three">Three</Button>,
          ],
        }}
      /> */}
      {/* עובד
      <MySetting
        setting={{
             settingDesc : "stringDefinitionDesc",
          type: ComponentType.Checkbox,
          props: { checked: checked, onChange: handleCheckboxChange },
        }}
      /> */}
      {/* עובד
      <MySetting
        setting={{
             settingDesc : "stringDefinitionDesc",
          type: ComponentType.FloatingActionButton,
          props: { color: 'primary', 'aria-label': 'add' },
          children: <span>+</span>,
        }}
      /> */}
      {/* עובד
      <MySetting
        setting={{
             settingDesc : "stringDefinitionDesc",
          type: ComponentType.RadioGroup,
          props: { name: 'radio-buttons-group' },
          children: (
            <RadioGroup>
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            </RadioGroup>
          ),
        }}
      /> */}
      {/* עובד
     <MySetting
  setting={{
       settingDesc : "stringDefinitionDesc",
    type: ComponentType.Rating,
    props: {
      value: ratingValue,
      onChange: (_: any, newValue: number | null) => setRatingValue(newValue)
    },
  }}
/> */}

      {/* עובד
      <MySetting
        setting={{
             settingDesc : "stringDefinitionDesc",
          type: ComponentType.Select,
          props: { value: selectedValue, onChange: handleSelectChange },
          children: [
            <MenuItem key="none" value="">
              None
            </MenuItem>,
            <MenuItem key="option1" value="option1">
              Option 1
            </MenuItem>,
            <MenuItem key="option2" value="option2">
              Option 2
            </MenuItem>,
          ],
        }}
      /> */}
      {/* <MySetting
        setting={{
             settingDesc : "stringDefinitionDesc",
          type: ComponentType.Slider,
          props: { value: sliderValue, onChange: handleSliderChange, 'aria-labelledby': 'continuous-slider' },
        }}
      /> */}
      {/* עובד
      <MySetting
        setting={{
          settingDesc:"stringDefinitionDesc",
          type: ComponentType.Switch,
          props: { checked: checked, onChange: handleSwitchChange },
        }}
      /> */}
      {/* <MySetting
        setting={{
             settingDesc : "stringDefinitionDesc",
          type: ComponentType.TextField,
          props: { label: 'TextField', variant: 'outlined' },
        }}
      /> */}
    
      <MySetting
  setting={{
    settingDesc: "stringDefinitionDesc",
    type: ComponentType.Input,
    props: { type: 'color' }, // הוספת סוג הקלט כדי להציג צבע
  }}
/>
<Header serviceName=' my service'/>
   
    </div>
  );
};

export default App;



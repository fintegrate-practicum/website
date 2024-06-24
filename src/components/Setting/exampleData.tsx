// exampleData.tsx
import * as React from 'react';
import { MenuItem } from '@mui/material';
import { ComponentType, MySettingProps } from './MySetting';
import { useState } from 'react';
export interface CategoryProps {
    CategoryItem: {
      CategoryName: string,
      Settings: MySettingProps[];
      SubCategory: CategoryProps[];
    };
  }
// אובייקט דוגמא להגדרות

//הפונקציות והמשתני עזר באמת לא צריכות להיות בתוך דף האוביקט הגדרות 
// אלא צריכות להיות קיימות אצל מי ששולח את האוביקט
// const [checked, setChecked] = useState(true);
// const [ratingValue, setRatingValue] = useState<number | null>(2);
// const [sliderValue, setSliderValue] = useState<number>(30);
// const [selectedValue, setSelectedValue] = useState('');


// const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setChecked(event.target.checked);
// };

// const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setChecked(event.target.checked);
// };

// const handleSliderChange = (event: Event, newValue: number | number[]) => {
//   setSliderValue(newValue as number);
// };

// const handleSelectChange = (event: React.ChangeEvent<{ value: string }>) => {
//   setSelectedValue(event.target.value);
// };

export const ctgr: CategoryProps[] = [
  {
    CategoryItem: {
      CategoryName: "תצוגה",
      Settings: [],
      SubCategory: [
        {
          CategoryItem: {
            CategoryName: "כתב",
            Settings: [
              {
                setting: {
                  settingDesc: "גופן",
                  children: [
                    {key:"none", value:"30",text:"san serif"},
                    {key:"none", value:"20",text:"ariel"},
                    {key:"none", value:"10",text:"david"}
            
                  ],
                  // props: { value: selectedValue, onChange: handleSelectChange },
                  type: ComponentType.Select,
                }
              },
              {
                setting: {
                  settingDesc: "גודל",
                  children: [
                    {key:"none", value:"0.5",string:"0.5"},
                    {key:"option1", value:"1",string:"1"},
                    {key:"option2", value:"1.5",string:"1.5"},
                    {key:"option3", value:"2",string:"2"},
                    {key:"option4", value:"2.5",string:"2.5"},
                    {key:"option5", value:"3",string:"3"},
                  ],
                  props: [],
                  type: ComponentType.Select
                }
              },
              {
                setting: {
                  settingDesc: "עובי",
                  children: [
                    {key:"none", value:"10",text:"דק"},
                    {key:"option1", value:"20",text:"בינוני"},
                    {key:"option2", value:"30",text:"עבה"}
                  ],
                  // props: { value: selectedValue, onChange: handleSelectChange },
                  type: ComponentType.Select
                }
              }
            ],
            SubCategory: []
          }
        }
      ]
    }
  },
  {
    CategoryItem: {
      CategoryName: "צבעים",
      Settings: [],
      SubCategory: [
        {
          CategoryItem: {
            CategoryName: "רקע",
            Settings: [
              {
                setting: {
                  settingDesc: "תמונת רקע",
                  type: ComponentType.Switch,
                  // props: { checked: checked, onChange: handleSwitchChange },
                }
              },
              {
                setting: {
                  settingDesc: "צבע",
                  type: ComponentType.Input,
                  props: { type: 'color' },
                }
              },
              {
                setting: {
                  settingDesc: "הודעת פתיחה",
                  children: [],
                  props: [],
                  type: ComponentType.TextField
                }
              }
            ],
            SubCategory: []
          }
        }
      ]
    }
  },
  {
    CategoryItem: {
      CategoryName: "כותרות",
      Settings: [],
      SubCategory: [
        {
          CategoryItem: {
            CategoryName: "כותרת ראשית",
            Settings: [
              {
                setting: {
                  settingDesc: "תוכן הכותרת",
                  type: ComponentType.RadioGroup,
                  props: { name: 'radio-group' },
                  children: [
                  { value: 'option1', label: 'הזמנות' },
                  { value: 'option2', label: 'משלוחים' }
                  ],
                }
              },
              {
                setting: {
                  settingDesc : "כותרת משנית",
                  type: ComponentType.ButtonGroup,
                  props: { variant: 'contained' },
                  children: [
                  {key:"1",value:"1"},
                  {key:"2",value:"2"}
                  ],
                }
              },
              {
                setting: {
                  settingDesc :  "כותרת משנה",
                  type: ComponentType.Checkbox,
                  // props: { checked: checked, onChange: handleCheckboxChange },
                }
              }
            ],
            SubCategory: []
          }
        },
        {
          CategoryItem: {
            CategoryName: "כתב",
            Settings: [
              {
                setting: {
                  settingDesc : "שקיפות",
                  type: ComponentType.Rating,
                  props: {
                    // value: ratingValue,
                    // onChange: (_: any, newValue: number | null) => setRatingValue(newValue)
                  },
                }
              },
              {
                setting: {
                  settingDesc: "גופן",
                  children: [
                    {key:"none", value:"30",text:"san serif"},
                    {key:"none", value:"20",text:"ariel"},
                    {key:"none", value:"10",text:"david"}
            
                  ],
                  // props: { value: selectedValue, onChange: handleSelectChange },
                  type: ComponentType.Select,
                }
              },
              {
                setting: {
                  settingDesc: "בהירות",
                  type: ComponentType.Slider,
                }
              }
            ],
            SubCategory: []
          }
        }
      ]
    }
  }
];










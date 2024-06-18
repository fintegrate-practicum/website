// exampleData.tsx
import * as React from 'react';
import { MenuItem } from '@mui/material';
import { ComponentType, MySettingProps } from './MySetting';
export interface CategoryProps {
    CategoryItem: {
      CategoryName: string,
      Settings: MySettingProps[];
      SubCategory: CategoryProps[];
    };
  }
// אובייקט דוגמא להגדרות
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
                    <MenuItem key="none" value="30">san serif</MenuItem>,
                    <MenuItem key="option1" value="20">אריאל</MenuItem>,
                    <MenuItem key="option2" value="10">דוד</MenuItem>,
                  ],
                  props: [],
                  type: ComponentType.Select,
                }
              },
              {
                setting: {
                  settingDesc: "גודל",
                  children: [
                    <MenuItem key="none" value="0.5">0.5</MenuItem>,
                    <MenuItem key="option1" value="1">1</MenuItem>,
                    <MenuItem key="option2" value="1.5">1.5</MenuItem>,
                    <MenuItem key="none" value="2">2</MenuItem>,
                    <MenuItem key="option1" value="2.5">2.5</MenuItem>,
                    <MenuItem key="option2" value="3">3</MenuItem>,
                  ],
                  props: [],
                  type: ComponentType.Select
                }
              },
              {
                setting: {
                  settingDesc: "עובי",
                  children: [
                    <MenuItem key="none" value="30">צר</MenuItem>,
                    <MenuItem key="option1" value="20">בינוני</MenuItem>,
                    <MenuItem key="option2" value="10">עבה</MenuItem>,
                  ],
                  props: [],
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
                  children: [],
                  props: [1, 2, 4, 5],
                  type: ComponentType.Switch,
                }
              },
              {
                setting: {
                  settingDesc: "צבע",
                  type: ComponentType.Button,
                  props: { variant: 'contained' },
                  children: 'Contained Button',
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
                  settingDesc: "גודל",
                  children: ["sans-serif", "ariel"],
                  props: [],
                  type: ComponentType.Checkbox,
                }
              },
              {
                setting: {
                  settingDesc: "כותרת משנית",
                  type: ComponentType.Button,
                  props: { variant: 'contained' },
                  children: 'Contained Button',
                }
              },
              {
                setting: {
                  settingDesc: "כותרת משנה",
                  children: [],
                  props: [],
                  type: ComponentType.TextField
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
                  settingDesc: "שקיפות",
                  children: [],
                  props: [],
                  type: ComponentType.Slider,
                }
              },
              {
                setting: {
                  settingDesc: "גופן",
                  type: ComponentType.Button,
                  props: { variant: 'contained' },
                  children: 'Contained Button',
                }
              },
              {
                setting: {
                  settingDesc: "בהירות",
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
  }
];










import { describe, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Category, CategoryProps } from '../components/Settings/Category';
import { expect } from 'chai';
import { ComponentType } from '../components/Settings/MySetting';
import { MenuItem } from '@mui/material';

//אובייקט דוגמא להגדרות

// const ctgr: CategoryProps[] =[]
export const ctgr: CategoryProps[] = [
  {
    CategoryItem: {
      CategoryName: "view",
      Settings: [],
      SubCategory: [
        {
          CategoryItem: {
            CategoryName: "words",
            Settings: [
              {
                setting: {
                  settingDesc: "שש",
                  children: [
                    <MenuItem key="none" value="30">
                      None
                    </MenuItem>,
                    <MenuItem key="option1" value="20">
                      30
                    </MenuItem>,
                    <MenuItem key="option2" value="10">
                      Option 2
                    </MenuItem>,
                  ],
                  props: [],
                  type: ComponentType.Select,
                }
              },
              {
                setting: {
                  settingDesc: "Size",
                  children: [],
                  props: [],
                  type: ComponentType.Select
                }
              },
              {
                setting: {
                  settingDesc: "color",
                  children: [],
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
  }
  ,
  {
    CategoryItem: {
      CategoryName: "אחר",
      Settings: [],
      SubCategory: [
        {
          CategoryItem: {
            CategoryName: "1",
            Settings: [
              {
                setting: {
                  settingDesc: "2",
                  children: [
                    "sans-serif",
                    "ariel"
                  ],
                  props: [],
                  type: ComponentType.Checkbox,
                }
              },
              {
                setting: {
                  settingDesc: "2",
                  type: ComponentType.Button,
                  props: { variant: 'contained' },
                  children: 'Contained Button',
                }
              },
              {
                setting: {
                  settingDesc: "2",
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
      CategoryName: "8",
      Settings: [],
      SubCategory: [
        {
          CategoryItem: {
            CategoryName: "1",
            Settings: [
              {
                setting: {
                  settingDesc: "2",
                  children: [
                    "sans-serif",
                    "ariel"
                  ],
                  props: [],
                  type: ComponentType.Checkbox,
                }
              },
              {
                setting: {
                  settingDesc: "2",
                  type: ComponentType.Button,
                  props: { variant: 'contained' },
                  children: 'Contained Button',
                }
              },
              {
                setting: {
                  settingDesc: "2",
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
            CategoryName: "4",
            Settings: [
              {
                setting: {
                  settingDesc: "2",
                  children: [
                    "sans-serif",
                    "ariel"
                  ],
                  props: [],
                  type: ComponentType.Checkbox,
                }
              },
              {
                setting: {
                  settingDesc: "2",
                  type: ComponentType.Button,
                  props: { variant: 'contained' },
                  children: 'Contained Button',
                }
              },
              {
                setting: {
                  settingDesc: "2",
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
]

describe('<Category>', () => {
  test('add subCategory successful', () => {
    render(<Category />)
  });
  test('category array is not empty', () => {
    expect(ctgr.length).not.to.equal(0);
  });
});



















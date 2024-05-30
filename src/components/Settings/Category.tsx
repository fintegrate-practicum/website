import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem, ListItemText, MenuItem } from '@mui/material';
//לא להעלות איתו

//עיצוב ההגדרה
const style = {
  p: 0,
  width: '60vw',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  direction: 'rtl',
  textAlign: 'right',
};
//מבנה קטגוריה
export interface CategoryProps {
  CategoryItem: {
    CategoryName: string,
    Settings: MySettingProps[];
    SubCategory: CategoryProps[];
  };
}

//אובייקט דוגמא להגדרות
const ctgr: CategoryProps[] = [
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
                    <MenuItem key="none" value="30">
                      san serif
                    </MenuItem>,
                    <MenuItem key="option1" value="20">
                      אריאל
                    </MenuItem>,
                    <MenuItem key="option2" value="10">
                      דוד
                    </MenuItem>,
                  ],
                  props: [],
                  type: ComponentType.Select,
                }
              },
              {
                setting: {
                  settingDesc: "גודל",
                  children: [<MenuItem key="none" value="0.5">
                    0.5                </MenuItem>,
                  <MenuItem key="option1" value="1">
                    1
                  </MenuItem>,
                  <MenuItem key="option2" value="1.5">
                    1.5
                  </MenuItem>,
                  <MenuItem key="none" value="2">
                    2
                  </MenuItem>,
                  <MenuItem key="option1" value="2.5">
                    2.5
                  </MenuItem>,
                  <MenuItem key="option2" value="3">
                    3
                  </MenuItem>,],
                  props: [],
                  type: ComponentType.Select
                }
              },
              {
                setting: {
                  settingDesc: "עובי",
                  children: [<MenuItem key="none" value="30">
                    צר
                  </MenuItem>,
                  <MenuItem key="option1" value="20">
                    בינוני
                  </MenuItem>,
                  <MenuItem key="option2" value="10">
                    עבה
                  </MenuItem>,],
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
                  children: [

                  ],
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
]

//הוספת אלמנט
export function AddSubCategory(SubCategoryProp: CategoryProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (<>
    {
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header">
          <Typography sx={{ width: '60vw', flexShrink: 0 }}>{SubCategoryProp?.CategoryItem.CategoryName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {SubCategoryProp.CategoryItem.Settings &&
              <List aria-label="mailbox folders">
                {SubCategoryProp.CategoryItem.Settings.map((s) =>
                  <>
                    <ListItem sx={style}>
                      <ListItemText primary={s.setting.settingDesc} />
                      <MySetting setting={s.setting} />
                    </ListItem>
                  </>)}</List>
            }
            {SubCategoryProp?.CategoryItem.SubCategory?.map((sc) => AddSubCategory(sc))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    }
  </>
  );
}
//קומפוננטה ראשית
export const Category: React.FC = () => {
  return (<>
    {ctgr.map((item) => (
      AddSubCategory(item)
    ))}
  </>);
}
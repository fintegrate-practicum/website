import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem, ListItemText, MenuItem } from '@mui/material';
import MySetting, { ComponentType, MySettingProps } from './MySetting';
import { ctgr } from './exampleData';
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
          expandIcon={<ExpandMoreIcon/>}
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
const Category: React.FC = () => {
  return (<>
    {ctgr.map((item) => (
      AddSubCategory(item)
    ))}
  </>);
}
export default Category
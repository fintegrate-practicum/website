import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '../../common/components/Typography/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem, ListItemText } from '@mui/material';
import MySetting, { MySettingProps } from './MySetting';

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

export interface CategoryProps {
  CategoryItem: {
    CategoryName: string;
    Settings: MySettingProps[];
    SubCategory: CategoryProps[];
  };
}

export interface ServiceSettings {
  service_name: string;
  settings_json: CategoryProps[];
}

interface AddSubCategoryProps extends CategoryProps {
  selectedServiceName: string;
  categoryName:string;
}

export default function AddSubCategory({ CategoryItem, selectedServiceName, categoryName }: AddSubCategoryProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography style={{ width: '60vw', flexShrink: 0 }}>
          {CategoryItem.CategoryName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {CategoryItem.Settings && (
            <List aria-label="mailbox folders">
              {CategoryItem.Settings.map((s, index) => (
                <ListItem key={index} sx={style}>
                  <ListItemText primary={s.setting.settingDesc} />
                  <MySetting setting={{ ...s.setting, serviceName: selectedServiceName, categoryName: categoryName }} />
                </ListItem>
              ))}
            </List>
          )}
          {CategoryItem.SubCategory?.map((sc, index) => (
            <AddSubCategory key={index} {...sc} selectedServiceName={selectedServiceName} categoryName={CategoryItem.CategoryName} />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { List, ListItem, ListItemText } from '@mui/material';
// import MySetting, { MySettingProps } from './MySetting';
// import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
// import { fetchServiceSettings } from '../../Redux/serviceSettingsSlice'; // עדכן את הנתיב בהתאם
// import { RootState } from '../../Redux/store';
// import { useEffect, useState } from 'react';
// import { ServiceSettings } from './exampleData';
// import exampleData from './exampleData';

// //עיצוב ההגדרה
// const style = {
//   p: 0,
//   width: '60vw',
//   borderRadius: 2,
//   border: '1px solid',
//   borderColor: 'divider',
//   backgroundColor: 'background.paper',
//   direction: 'rtl',
//   textAlign: 'right',
// };
// //מבנה קטגוריה
// export interface CategoryProps {
//   CategoryItem: {
//     CategoryName: string,
//     Settings: MySettingProps[];
//     SubCategory: CategoryProps[];
//   };
// }
// //הוספת אלמנט
// export function AddSubCategory(SubCategoryProp: CategoryProps) {
//   console.log(SubCategoryProp)
//   const [expanded, setExpanded] = React.useState<string | false>(false);
//   const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };
//   return (<>
//     {
//       <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel4bh-content"
//           id="panel4bh-header">
//           <Typography style={{ width: '60vw', flexShrink: 0 }}>{SubCategoryProp?.CategoryItem.CategoryName}</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             {SubCategoryProp.CategoryItem.Settings &&
//               <List aria-label="mailbox folders">
//                 {SubCategoryProp.CategoryItem.Settings.map((s) =>
//                   <>
//                     <ListItem key={s.setting.settingDesc} sx={style}>
//                       <ListItemText primary={s.setting.settingDesc} />
//                       <MySetting setting={s.setting} />
//                     </ListItem>
//                   </>)}</List>
//             }
//             {SubCategoryProp?.CategoryItem.SubCategory?.map((sc) => (
//               <AddSubCategory key={sc.CategoryItem.CategoryName} {...sc} />
//             ))}
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     }
//   </>
//   );
// }
// const Category: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const serviceSettings: ServiceSettings[] = useAppSelector((state: RootState) => state.serviceSettingsSlice.settings);
//   console.log(serviceSettings);
//   useEffect(() => {
//     dispatch(fetchServiceSettings());
//   }, [dispatch]);

//   console.log(serviceSettings);

//   return (
//     <>
//       {serviceSettings?.map((item) => (
//         <AddSubCategory key={item.settings_json.CategoryItem.CategoryName} {...item.settings_json} />
//       ))}
//     </>
//   );
// };

// export default Category;
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem, ListItemText } from '@mui/material';
import MySetting, { MySettingProps } from './MySetting';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { fetchServiceSettings } from '../../Redux/serviceSettingsSlice';
import { RootState } from '../../Redux/store';
import { useEffect } from 'react';

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
  service_id: number;
  settings_json: CategoryProps;
}

export function AddSubCategory(SubCategoryProp: CategoryProps) {
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
          {SubCategoryProp?.CategoryItem.CategoryName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div> {/* שימוש ב-div במקום Typography */}
          {SubCategoryProp.CategoryItem.Settings && (
            <List aria-label="mailbox folders">
              {SubCategoryProp.CategoryItem.Settings.map((s, index) => (
                <ListItem key={`${s.setting.settingDesc}-${index}`} sx={style}>
                  <ListItemText primary={s.setting.settingDesc} />
                  <MySetting setting={s.setting} />
                </ListItem>
              ))}
            </List>
          )}
          {SubCategoryProp?.CategoryItem.SubCategory?.map((sc, index) => (
            <AddSubCategory key={`${sc.CategoryItem.CategoryName}-${index}`} {...sc} />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

const Category: React.FC = () => {
  const dispatch = useAppDispatch();
  const serviceSettings: ServiceSettings[] = useAppSelector((state: RootState) => state.serviceSettingsSlice.settings);

  useEffect(() => {
    dispatch(fetchServiceSettings());
  }, []);

  return (
    <>
      {serviceSettings?.map((item, index) => (
        <AddSubCategory key={`${item.settings_json.CategoryItem.CategoryName}-${index}`} {...item.settings_json} />
      ))}
    </>
  );
};

export default Category;

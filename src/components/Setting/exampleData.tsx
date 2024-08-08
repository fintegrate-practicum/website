import { ComponentType } from './MySetting';
import { ServiceSettings } from './Category';

const exampleData: ServiceSettings[] = [
{
  service_id: 2,
  settings_json: {
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
                    { key: "none", value: "30", text: "san serif" },
                    { key: "none", value: "20", text: "ariel" },
                    { key: "none", value: "10", text: "david" }
                  ],
                  type: ComponentType.Select
                }
              },
              {
                setting: {
                  settingDesc: "גודל",
                  children: [
                    { key: "none", value: "0.5", text: "0.5" },
                    { key: "option1", value: "1", text: "1" },
                    { key: "option2", value: "1.5", text: "1.5" },
                    { key: "option3", value: "2", text: "2" },
                    { key: "option4", value: "2.5", text: "2.5" },
                    { key: "option5", value: "3", text: "3" }
                  ],
                  type: ComponentType.Select
                }
              },
              {
                setting: {
                  settingDesc: "עובי",
                  children: [
                    { key: "none", value: "10", text: "דק" },
                    { key: "option1", value: "20", text: "בינוני" },
                    { key: "option2", value: "30", text: "עבה" }
                  ],
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
}
];


//דגומא לקובץ שצריך להשלח ב mongo
// {
//   "service_id": 1,
//   "settings_json": {
//     "CategoryItem": {
//       "CategoryName": "כותרות",
//       "Settings": [],
//       "SubCategory": [
//         {
//           "CategoryItem": {
//             "CategoryName": "כותרת ראשית",
//             "Settings": [
//               {
//                 "setting": {
//                   "settingDesc": "תוכן הכותרת",
//                   "type": "RadioGroup",
//                   "props": {
//                     "name": "radio-group"
//                   },
//                   "children": [
//                     {
//                       "value": "option1",
//                       "label": "הזמנות"
//                     },
//                     {
//                       "value": "option2",
//                       "label": "משלוחים"
//                     }
//                   ]
//                 }
//               },
//               {
//                 "setting": {
//                   "settingDesc": "כותרת משנית",
//                   "type": "ButtonGroup",
//                   "props": {
//                     "variant": "contained"
//                   },
//                   "children": [
//                     {
//                       "key": "1",
//                       "value": "1"
//                     },
//                     {
//                       "key": "2",
//                       "value": "2"
//                     }
//                   ]
//                 }
//               },
//               {
//                 "setting": {
//                   "settingDesc": "כותרת משנה",
//                   "type": "Checkbox"
//                 }
//               }
//             ],
//             "SubCategory": []
//           }
//         },
//         {
//           "CategoryItem": {
//             "CategoryName": "כתב",
//             "Settings": [
//               {
//                 "setting": {
//                   "settingDesc": "שקיפות",
//                   "type": "Rating"
//                 }
//               },
//               {
//                 "setting": {
//                   "settingDesc": "גופן",
//                   "children": [
//                     {
//                       "key": "none",
//                       "value": "30",
//                       "text": "san serif"
//                     },
//                     {
//                       "key": "none",
//                       "value": "20",
//                       "text": "ariel"
//                     },
//                     {
//                       "key": "none",
//                       "value": "10",
//                       "text": "david"
//                     }
//                   ],
//                   "type": "Select"
//                 }
//               },
//               {
//                 "setting": {
//                   "settingDesc": "בהירות",
//                   "type": "Slider"
//                 }
//               }
//             ],
//             "SubCategory": []
//           }
//         }
//       ]
//     }
//   }
// }

export default exampleData;

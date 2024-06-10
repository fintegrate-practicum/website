// import { FC, ReactElement } from 'react';
// import { Button, ButtonGroup, Checkbox, RadioGroup, Rating, Select, Slider, Switch, TextField } from '@mui/material';

// enum ButtonType {
//     Button = 'Button',
//     ButtonGroup = 'ButtonGroup',
//     Checkbox = 'Checkbox',
//     FloatingActionButton = 'FloatingActionButton',
//     RadioGroup = 'RadioGroup',
//     Rating = 'Rating',
//     Select = 'Select',
//     Slider = 'Slider',
//     Switch = 'Switch',
//     TextField = 'TextField',
//     TransferList = 'TransferList',
// }

// interface DefinitionProps {
//     definitionItem: {
//         DefinitionDesc: string;
//         Option: string;
//         Attribute?: string[];
//         ButtonType: ButtonType;
//     };
// }

// // סוג כללי עבור MUIComponents
// interface MUIComponents {
//     [key: string]: FC<any>; // סוג כללי עבור כל הרכיבים של MUI
// }

// // קביעת סוג המפתחות ידנית
// const MUIComponents: MUIComponents = {
//     Button: Button,
//     ButtonGroup: ButtonGroup,
//     Checkbox: Checkbox,
//     RadioGroup: RadioGroup,
//     Rating: Rating,
//     Select: Select,
//     Slider: Slider,
//     Switch: Switch,
//     TextField: TextField,
// };

// const Definition: FC<DefinitionProps> = ({ definitionItem }: DefinitionProps): ReactElement => {
//     const { DefinitionDesc, Option, Attribute, ButtonType } = definitionItem;

//     // בדיקה אם המפתח קיים ב-MUIComponents
//     const MUIComponent = ButtonType in MUIComponents ? MUIComponents[ButtonType] : undefined;

//     return (
//         <div>
//             <span>שלום!!</span>
         
//             {/* <Checkbox defaultChecked /> */}
//             {/* {MUIComponent && <MUIComponent {Option}></MUIComponent>} */}
//             {MUIComponent && <MUIComponent>{DefinitionDesc}</MUIComponent>}


//         </div>
//     );
// };

// export default Definition;




import { FC, ReactElement } from 'react';
import { Button, Checkbox } from '@mui/material';

enum ButtonType {
    Button = 'button',
    ButtonGroup = 'button group',
    Checkbox = 'checkbox',
    FloatingActionButton = 'floating action button',
    RadioGroup = 'radio group',
    Rating = 'rating',
    Select = 'select',
    Slider = 'slider',
    Switch = 'switch',
    TextField = 'text field',
    TransferList = 'transfer list',
   
}
  
interface DefinitionProps {
    definitionItem: {
        DefinitionDesc: string;
        Option: string;
        Attribute?: string[];
        ButtonType: ButtonType;
    };
}

const Definition: FC<DefinitionProps> = ({ definitionItem }: DefinitionProps): ReactElement => {
    const { DefinitionDesc, Option, ButtonType } = definitionItem;

    let componentToRender;

    switch (ButtonType) {
        case ButtonType.Button:
            componentToRender = <Button>{DefinitionDesc}</Button>;
            break;
        case ButtonType.Checkbox:
            componentToRender = <Checkbox defaultChecked>{DefinitionDesc}</Checkbox>;
            break;
        // ניתן להוסיף קייסים נוספים כאן עבור הרכיבים הנוספים
        default:
            componentToRender = null;
            break;
    }

    return (
        <div>
            {componentToRender}
        </div>
    );
};

export default Definition;



// import { FC, ReactElement } from 'react';
// import { Button, ButtonGroup, Checkbox, RadioGroup, Rating, Select, Slider, Switch, TextField } from '@mui/material';

// enum ButtonType {
//     Button = 'Button',
//     ButtonGroup = 'ButtonGroup',
//     Checkbox = 'Checkbox',
//     FloatingActionButton = 'FloatingActionButton',
//     RadioGroup = 'RadioGroup',
//     Rating = 'Rating',
//     Select = 'Select',
//     Slider = 'Slider',
//     Switch = 'Switch',
//     TextField = 'TextField',
//     TransferList = 'TransferList',
// }

// interface DefinitionProps {
//     definitionItem: {
//         DefinitionDesc: string;
//         Option: string;
//         Attribute?: string[];
//         ButtonType: ButtonType;
//     };
// }
// const Definition: FC<DefinitionProps> = ({ definitionItem }: DefinitionProps): ReactElement => {
//     const { DefinitionDesc, Option, Attribute, ButtonType } = definitionItem;
//     return (
//         <div>
//             <span>שלום!!</span>
//             <input type={ButtonType}  />
//             </div>
//     );
// };
// export default Definition;

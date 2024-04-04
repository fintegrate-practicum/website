 //import Button from '@mui/material/Button';
import { palette } from '@mui/system';
 import theme from './website/src/Theme';
 import { Button } from '@mui/material/Button';


const Button = ({value}: { value: string | number   | Iterable<React.ReactNode>  ; }) => {
    return (
        <Button style={{
            backgroundColor: theme.palette.secondary.dark,
            borderColor: theme.palette.info.main,
            outlineColor: theme.palette.info.main,
            color: theme.palette.info.main
        }}
             >{value}</Button>
    )
}
export default Button;

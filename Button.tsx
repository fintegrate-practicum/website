import   MaterialButton  from '@mui/material/Button';
import theme from './src/Theme';

const Button = (props: any) => {
    return (
        <MaterialButton onClick={props.onClickFunction} style={{
            backgroundColor: theme.palette.secondary.dark,
            borderColor: theme.palette.info.main,
            outlineColor: theme.palette.info.main,
            color: theme.palette.info.main
        }}
             >{props.value}</MaterialButton>
    )
}

export default Button;

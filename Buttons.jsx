import Button from '@mui/material/Button';

const Buttons = (props) => {
    return (

        <Button style={{
            backgroundColor: "#F2CB05",
            borderColor: "#4F5902",
            outlineColor: "#4F5902",
            color: "#4F5902"
        }}
            variant="contained" >{props.value}</Button>
    )
}

export default Buttons;

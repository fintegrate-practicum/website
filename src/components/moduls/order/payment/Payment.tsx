import { CircularProgress } from "@mui/material"

const Payment = () => {
    return (
        <>
            <h1>עמוד תשלום...</h1>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </>
    )
}
export default Payment
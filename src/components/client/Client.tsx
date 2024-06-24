import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function BasicButtons() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
      }}
    >
      <Stack spacing={2} direction="row">
        <Button variant="contained">צור הזמנה</Button>
        <Button variant="contained">התחברות</Button>
      </Stack>
    </Box>
  );
}
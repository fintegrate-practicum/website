import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">צור הזמנה</Button>
      <Button variant="contained">התחברות</Button>
    </Stack>
  );
}
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Button from '../../../common/components/Button/Button';

interface CustomFieldModalProps {
  open: boolean;
  onClose: () => void;
  onDecision: (addFields: boolean) => void;
}

export const CustomFieldModal: React.FC<CustomFieldModalProps> = ({
  open,
  onClose,
  onDecision,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ fontSize: '16px', fontFamily: 'Arial' }}>
        <p>{t('inventory.explainCustomFields')}</p>
      </DialogContent>
      <DialogTitle>{t('inventory.Continue to Custom Fields?')}</DialogTitle>
      <DialogActions>
        <Button onClick={() => onDecision(false)} color='primary'>
          {t('inventory.No')}
        </Button>
        <Button onClick={() => onDecision(true)} color='primary'>
          {t('inventory.Yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

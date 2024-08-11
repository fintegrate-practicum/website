import './ConfirmeOrder.css';
import { useTranslation } from 'react-i18next';

interface Order {
  _id: string;
  // Add any other necessary order details here
}

const ConfirmeOrder = ({ newOrder }: { newOrder: Order }) => {
  const { t } = useTranslation();

  return (
    <div className='contain'>
      {t("order.Order number")}: {newOrder._id} {t("order.was successfully received.")}<br/>
      {t("order.A purchase confirmation email will be sent to the email registered in the system")}
    </div>
  );
}

export default ConfirmeOrder;
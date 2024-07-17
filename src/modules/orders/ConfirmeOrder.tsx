
import './ConfirmeOrder.css';

interface Order {
  _id: string;
//להוסיף עוד פרטי הזמנה הנחוצים
}
const ConfirmeOrder = ({ newOrder }: { newOrder: Order }) => {
  return (
    <div className='contain'>
      Order number:{newOrder._id} was successfully received.<br/>
      A purchase confirmation email will be sent to the email registered in the system
    </div>
  );
}

export default ConfirmeOrder;
import './App.css';
import ShoppingBag from './shoppingBag/ShoppingBag';

import BaseWizard from './Stepper/BaseWizard';
import MyTable from './smallBag/SmallShoppingBag';

function Orders() {
  return (
    <>
    <BaseWizard />
    {/* זה אמור להיות כתוב מתוך קומפננטת תשלום-לא כאן */}
    {/* <ConfirmeOrder newOrder={newOrder} /> */}
    {/* <SmallShoppingBag /> */}
    <ShoppingBag initialBag={[]}/>
    <MyTable/>
    </>
  );
}

export default Orders;
